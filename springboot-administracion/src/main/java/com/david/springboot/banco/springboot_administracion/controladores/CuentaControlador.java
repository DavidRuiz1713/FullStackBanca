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

import com.david.springboot.banco.springboot_administracion.dto.CuentaDTO;
import com.david.springboot.banco.springboot_administracion.entidades.Cuenta;
import com.david.springboot.banco.springboot_administracion.respuestas.ApiResponse;
import com.david.springboot.banco.springboot_administracion.servicios.CuentaServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/cuentas")
public class CuentaControlador {

    private final CuentaServicio cuentaServicio;

    public CuentaControlador(CuentaServicio cuentaServicio) {
        this.cuentaServicio = cuentaServicio;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Cuenta>> createCuenta(@Valid @RequestBody CuentaDTO cuentaDTO) {
        Cuenta nuevaCuenta = cuentaServicio.createCuenta(cuentaDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(nuevaCuenta));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Cuenta>>> getAllCuentas() {
        List<Cuenta> cuentas = cuentaServicio.getAllCuentas();
        return ResponseEntity.ok(new ApiResponse<>(cuentas));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Cuenta>> getCuentaById(@PathVariable Long id) {
        Cuenta cuenta = cuentaServicio.getCuentaById(id);
        return ResponseEntity.ok(new ApiResponse<>(cuenta));
    }

    @GetMapping("/numero/{numeroCuenta}")
    public ResponseEntity<ApiResponse<Cuenta>> getCuentaByNumero(@PathVariable String numeroCuenta) {
        Cuenta cuenta = cuentaServicio.getCuentaByNumero(numeroCuenta);
        return ResponseEntity.ok(new ApiResponse<>(cuenta));
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<ApiResponse<List<Cuenta>>> getCuentasByCliente(@PathVariable Long clienteId) {
        List<Cuenta> cuentas = cuentaServicio.getCuentasByCliente(clienteId);
        return ResponseEntity.ok(new ApiResponse<>(cuentas));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Cuenta>> updateCuenta(@PathVariable Long id,
            @Valid @RequestBody CuentaDTO cuentaDTO) {
        Cuenta cuentaActualizada = cuentaServicio.updateCuenta(id, cuentaDTO);
        return ResponseEntity.ok(new ApiResponse<>(cuentaActualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCuenta(@PathVariable Long id) {
        cuentaServicio.deleteCuenta(id);
        return ResponseEntity.noContent().build();
    }
}