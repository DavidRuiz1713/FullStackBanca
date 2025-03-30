package com.david.springboot.banco.springboot_administracion.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.david.springboot.banco.springboot_administracion.entidades.Cliente;

import java.util.Optional;

@Repository
public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByClienteId(String clienteId);

    boolean existsByClienteId(String clienteId);

    boolean existsByIdentificacion(String identificacion);
}
