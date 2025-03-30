package com.david.springboot.banco.springboot_administracion.controladores;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.david.springboot.banco.springboot_administracion.dto.ClienteDTO;
import com.david.springboot.banco.springboot_administracion.entidades.Cliente;
import com.david.springboot.banco.springboot_administracion.respuestas.ApiResponse;
import com.david.springboot.banco.springboot_administracion.servicios.ClienteServicio;

public class ClienteControladorTest {

    @Mock
    private ClienteServicio clienteService;

    @InjectMocks
    private ClienteControlador clienteControlador;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCliente_ShouldReturnCreatedStatus() {
        ClienteDTO clienteDTO = new ClienteDTO();
        clienteDTO.setClienteId("CLI123");

        Cliente cliente = new Cliente();
        cliente.setClienteId("CLI123");

        when(clienteService.createCliente(any(ClienteDTO.class))).thenReturn(cliente);

        ResponseEntity<ApiResponse<Cliente>> response = clienteControlador.createCliente(clienteDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("CLI123", response.getBody().getData().getClienteId());
        verify(clienteService, times(1)).createCliente(any(ClienteDTO.class));
    }

    @Test
    void getAllClientes_ShouldReturnListOfClientes() {
        Cliente cliente1 = new Cliente();
        cliente1.setClienteId("CLI123");

        Cliente cliente2 = new Cliente();
        cliente2.setClienteId("CLI456");

        List<Cliente> clientes = Arrays.asList(cliente1, cliente2);

        when(clienteService.getAllClientes()).thenReturn(clientes);

        ResponseEntity<ApiResponse<List<Cliente>>> response = clienteControlador.getAllClientes();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().getData().size());
        verify(clienteService, times(1)).getAllClientes();
    }

    @Test
    void getClienteById_ShouldReturnCliente() {
        Cliente cliente = new Cliente();
        cliente.setId(1L);
        cliente.setClienteId("CLI123");

        when(clienteService.getClienteById(1L)).thenReturn(cliente);

        ResponseEntity<ApiResponse<Cliente>> response = clienteControlador.getClienteById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("CLI123", response.getBody().getData().getClienteId());
        verify(clienteService, times(1)).getClienteById(1L);
    }

    @Test
    void deleteCliente_ShouldReturnNoContent() {
        ResponseEntity<Void> response = clienteControlador.deleteCliente(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(clienteService, times(1)).deleteCliente(1L);
    }
}