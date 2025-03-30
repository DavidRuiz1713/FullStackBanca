package com.david.springboot.banco.springboot_administracion.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.david.springboot.banco.springboot_administracion.entidades.Cuenta;

import java.util.List;
import java.util.Optional;

@Repository
public interface CuentaRepositorio extends JpaRepository<Cuenta, Long> {
    Optional<Cuenta> findByNumeroCuenta(String numeroCuenta);

    boolean existsByNumeroCuenta(String numeroCuenta);

    List<Cuenta> findByCliente_Id(Long clienteId);
}