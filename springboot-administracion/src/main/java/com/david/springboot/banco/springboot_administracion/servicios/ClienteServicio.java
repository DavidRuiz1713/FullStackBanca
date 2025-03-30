package com.david.springboot.banco.springboot_administracion.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.david.springboot.banco.springboot_administracion.dto.ClienteDTO;
import com.david.springboot.banco.springboot_administracion.entidades.Cliente;
import com.david.springboot.banco.springboot_administracion.excepciones.RecursoNoEncontradoExcepcion;
import com.david.springboot.banco.springboot_administracion.excepciones.RecursoYaExisteExcepcion;
import com.david.springboot.banco.springboot_administracion.repositorios.ClienteRepositorio;

@Service
public class ClienteServicio {

    private final ClienteRepositorio clienteRepositorio;

    @Autowired
    public ClienteServicio(ClienteRepositorio clienteRepositorio) {
        this.clienteRepositorio = clienteRepositorio;
    }

    @Transactional
    public Cliente createCliente(ClienteDTO clienteDTO) {
        if (clienteRepositorio.existsByClienteId(clienteDTO.getClienteId())) {
            throw new RecursoYaExisteExcepcion("Cliente con ID " + clienteDTO.getClienteId() + " ya existe");
        }

        if (clienteRepositorio.existsByIdentificacion(clienteDTO.getIdentificacion())) {
            throw new RecursoYaExisteExcepcion(
                    "Cliente con identificación " + clienteDTO.getIdentificacion() + " ya existe");
        }

        Cliente cliente = new Cliente();
        // Mapear campos del DTO a la entidad
        cliente.setNombre(clienteDTO.getNombre());
        cliente.setGenero(clienteDTO.getGenero());
        cliente.setEdad(clienteDTO.getEdad());
        cliente.setIdentificacion(clienteDTO.getIdentificacion());
        cliente.setDireccion(clienteDTO.getDireccion());
        cliente.setTelefono(clienteDTO.getTelefono());
        cliente.setClienteId(clienteDTO.getClienteId());
        cliente.setContrasena(clienteDTO.getContrasena());
        cliente.setEstado(clienteDTO.getEstado());

        return clienteRepositorio.save(cliente);
    }

    @Transactional(readOnly = true)
    public List<Cliente> getAllClientes() {
        return clienteRepositorio.findAll();
    }

    @Transactional(readOnly = true)
    public Cliente getClienteById(Long id) {
        return clienteRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Cliente no encontrado con ID: " + id));
    }

    @Transactional(readOnly = true)
    public Cliente getClienteByClienteId(String clienteId) {
        return clienteRepositorio.findByClienteId(clienteId)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Cliente no encontrado con ID: " + clienteId));
    }

    @Transactional
    public Cliente updateCliente(Long id, ClienteDTO clienteDTO) {
        Cliente cliente = clienteRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Cliente no encontrado con ID: " + id));

        // Actualizar campos permitidos
        cliente.setNombre(clienteDTO.getNombre());
        cliente.setGenero(clienteDTO.getGenero());
        cliente.setEdad(clienteDTO.getEdad());
        cliente.setDireccion(clienteDTO.getDireccion());
        cliente.setTelefono(clienteDTO.getTelefono());
        cliente.setEstado(clienteDTO.getEstado());

        return clienteRepositorio.save(cliente);
    }

    @Transactional
    public void deleteCliente(Long id) {
        if (!clienteRepositorio.existsById(id)) {
            throw new RecursoNoEncontradoExcepcion("Cliente no encontrado con ID: " + id);
        }
        clienteRepositorio.deleteById(id);
    }
}
