package com.david.springboot.banco.springboot_administracion.repositorios;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.david.springboot.banco.springboot_administracion.entidades.Movimiento;

@Repository
public interface MovimientoRepositorio extends JpaRepository<Movimiento, Long> {
    List<Movimiento> findByCuentaId(Long cuentaId);

    List<Movimiento> findByFechaBetweenAndCuentaClienteId(LocalDateTime inicio, LocalDateTime fin, Long clienteId);
}
