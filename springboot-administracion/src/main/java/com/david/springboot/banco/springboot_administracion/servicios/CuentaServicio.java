package com.david.springboot.banco.springboot_administracion.servicios;

import java.util.List;

import com.david.springboot.banco.springboot_administracion.dto.CuentaDTO;
import com.david.springboot.banco.springboot_administracion.entidades.Cuenta;
import com.david.springboot.banco.springboot_administracion.excepciones.RecursoNoEncontradoExcepcion;
import com.david.springboot.banco.springboot_administracion.excepciones.RecursoYaExisteExcepcion;
import com.david.springboot.banco.springboot_administracion.repositorios.ClienteRepositorio;
import com.david.springboot.banco.springboot_administracion.repositorios.CuentaRepositorio;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CuentaServicio {

    private final CuentaRepositorio cuentaRepositorio;
    private final ClienteRepositorio clienteRepositorio;

    @Transactional
    public Cuenta createCuenta(CuentaDTO cuentaDTO) {
        // Validar que el número de cuenta no exista
        if (cuentaRepositorio.existsByNumeroCuenta(cuentaDTO.getNumeroCuenta())) {
            throw new RecursoYaExisteExcepcion("El número de cuenta ya está en uso");
        }

        // Obtener el cliente
        var cliente = clienteRepositorio.findById(cuentaDTO.getClienteId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Cliente no encontrado"));

        // Crear la cuenta
        Cuenta cuenta = new Cuenta();
        cuenta.setNumeroCuenta(cuentaDTO.getNumeroCuenta());
        cuenta.setTipoCuenta(cuentaDTO.getTipoCuenta());
        cuenta.setSaldoInicial(cuentaDTO.getSaldoInicial());
        cuenta.setEstado(cuentaDTO.getEstado());
        cuenta.setCliente(cliente);

        return cuentaRepositorio.save(cuenta);
    }

    public List<Cuenta> getAllCuentas() {
        return cuentaRepositorio.findAll();
    }

    public Cuenta getCuentaById(Long id) {
        return cuentaRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Cuenta no encontrada"));
    }

    public Cuenta getCuentaByNumero(String numeroCuenta) {
        return cuentaRepositorio.findByNumeroCuenta(numeroCuenta)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Cuenta no encontrada"));
    }

    public List<Cuenta> getCuentasByCliente(Long clienteId) {
        return cuentaRepositorio.findByCliente_Id(clienteId);
    }

    @Transactional
    public Cuenta updateCuenta(Long id, CuentaDTO cuentaDTO) {
        Cuenta cuenta = getCuentaById(id);

        if (cuentaDTO.getNumeroCuenta() != null &&
                !cuentaDTO.getNumeroCuenta().equals(cuenta.getNumeroCuenta())) {
            if (cuentaRepositorio.existsByNumeroCuenta(cuentaDTO.getNumeroCuenta())) {
                throw new RecursoYaExisteExcepcion("El número de cuenta ya está en uso");
            }
            cuenta.setNumeroCuenta(cuentaDTO.getNumeroCuenta());
        }

        if (cuentaDTO.getTipoCuenta() != null) {
            cuenta.setTipoCuenta(cuentaDTO.getTipoCuenta());
        }

        if (cuentaDTO.getSaldoInicial() != null) {
            cuenta.setSaldoInicial(cuentaDTO.getSaldoInicial());
        }

        if (cuentaDTO.getEstado() != null) {
            cuenta.setEstado(cuentaDTO.getEstado());
        }

        return cuentaRepositorio.save(cuenta);
    }

    @Transactional
    public void deleteCuenta(Long id) {
        Cuenta cuenta = getCuentaById(id);
        cuentaRepositorio.delete(cuenta);
    }
}