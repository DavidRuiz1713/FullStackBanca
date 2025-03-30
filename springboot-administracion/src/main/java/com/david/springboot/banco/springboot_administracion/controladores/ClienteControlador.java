package com.david.springboot.banco.springboot_administracion.controladores;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.david.springboot.banco.springboot_administracion.dto.ClienteDTO;
import com.david.springboot.banco.springboot_administracion.entidades.Cliente;
import com.david.springboot.banco.springboot_administracion.respuestas.ApiResponse;
import com.david.springboot.banco.springboot_administracion.servicios.ClienteServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/clientes")
public class ClienteControlador {

    private final ClienteServicio clienteServicio;

    public ClienteControlador(ClienteServicio clienteServicio) {
        this.clienteServicio = clienteServicio;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Cliente>> createCliente(@Valid @RequestBody ClienteDTO clienteDTO) {
        Cliente nuevoCliente = clienteServicio.createCliente(clienteDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(nuevoCliente));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Cliente>>> getAllClientes() {
        List<Cliente> clientes = clienteServicio.getAllClientes();
        return ResponseEntity.ok(new ApiResponse<>(clientes));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<ApiResponse<Cliente>> getClienteById(@PathVariable Long id) {
        Cliente cliente = clienteServicio.getClienteById(id);
        return ResponseEntity.ok(new ApiResponse<>(cliente));
    }

    @GetMapping("/cliente-id/{clienteId}")
    public ResponseEntity<ApiResponse<Cliente>> getClienteByClienteId(@PathVariable String clienteId) {
        Cliente cliente = clienteServicio.getClienteByClienteId(clienteId);
        return ResponseEntity.ok(new ApiResponse<>(cliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Cliente>> updateCliente(@PathVariable Long id,
            @Valid @RequestBody ClienteDTO clienteDTO) {
        Cliente clienteActualizado = clienteServicio.updateCliente(id, clienteDTO);
        return ResponseEntity.ok(new ApiResponse<>(clienteActualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        clienteServicio.deleteCliente(id);
        return ResponseEntity.noContent().build();
    }
}