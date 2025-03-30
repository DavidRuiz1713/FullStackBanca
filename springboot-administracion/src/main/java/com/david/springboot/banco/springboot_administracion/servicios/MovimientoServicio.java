package com.david.springboot.banco.springboot_administracion.servicios;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.david.springboot.banco.springboot_administracion.dto.MovimientoDTO;
import com.david.springboot.banco.springboot_administracion.entidades.Cuenta;
import com.david.springboot.banco.springboot_administracion.entidades.Movimiento;
import com.david.springboot.banco.springboot_administracion.excepciones.CuentaNoEncontradaException;
import com.david.springboot.banco.springboot_administracion.excepciones.SaldoInsuficienteException;
import com.david.springboot.banco.springboot_administracion.repositorios.CuentaRepositorio;
import com.david.springboot.banco.springboot_administracion.repositorios.MovimientoRepositorio;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovimientoServicio {

    private final MovimientoRepositorio movimientoRepositorio;
    private final CuentaRepositorio cuentaRepositorio;

    @Transactional
    public Movimiento createMovimiento(MovimientoDTO movimientoDTO) {
        Cuenta cuenta = cuentaRepositorio.findById(movimientoDTO.getCuentaId())
                .orElseThrow(() -> new CuentaNoEncontradaException("Cuenta no encontrada"));

        // Validar saldo para retiros
        if ("Retiro".equalsIgnoreCase(movimientoDTO.getTipoMovimiento())) {
            if (cuenta.getSaldoInicial().compareTo(movimientoDTO.getValor()) < 0) {
                throw new SaldoInsuficienteException("Saldo insuficiente para realizar el retiro");
            }
            cuenta.setSaldoInicial(cuenta.getSaldoInicial().subtract(movimientoDTO.getValor()));
        } else {
            cuenta.setSaldoInicial(cuenta.getSaldoInicial().add(movimientoDTO.getValor()));
        }

        cuentaRepositorio.save(cuenta);

        Movimiento movimiento = new Movimiento();
        movimiento.setTipoMovimiento(movimientoDTO.getTipoMovimiento());
        movimiento.setValor(movimientoDTO.getValor());
        movimiento.setSaldo(cuenta.getSaldoInicial());
        movimiento.setCuenta(cuenta);

        return movimientoRepositorio.save(movimiento);
    }

    public List<Movimiento> getAllMovimientos() {
        return movimientoRepositorio.findAll();
    }

    public Movimiento getMovimientoById(Long id) {
        return movimientoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Movimiento no encontrado"));
    }

    public List<Movimiento> getMovimientosByCuenta(Long cuentaId) {
        return movimientoRepositorio.findByCuentaId(cuentaId);
    }

    public List<Movimiento> getMovimientosByFechaAndCliente(String fechaInicio, String fechaFin, Long clienteId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate inicio = LocalDate.parse(fechaInicio, formatter);
        LocalDate fin = LocalDate.parse(fechaFin, formatter);

        return movimientoRepositorio.findByFechaBetweenAndCuentaClienteId(
                inicio.atStartOfDay(),
                fin.atTime(23, 59, 59),
                clienteId);
    }
}