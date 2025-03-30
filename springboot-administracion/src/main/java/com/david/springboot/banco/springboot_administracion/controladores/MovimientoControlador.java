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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.david.springboot.banco.springboot_administracion.dto.MovimientoDTO;
import com.david.springboot.banco.springboot_administracion.entidades.Movimiento;
import com.david.springboot.banco.springboot_administracion.respuestas.ApiResponse;
import com.david.springboot.banco.springboot_administracion.servicios.MovimientoServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/movimientos")
public class MovimientoControlador {

    private final MovimientoServicio movimientoServicio;

    public MovimientoControlador(MovimientoServicio movimientoServicio) {
        this.movimientoServicio = movimientoServicio;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Movimiento>> createMovimiento(@Valid @RequestBody MovimientoDTO movimientoDTO) {
        Movimiento nuevoMovimiento = movimientoServicio.createMovimiento(movimientoDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(nuevoMovimiento));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Movimiento>>> getAllMovimientos() {
        List<Movimiento> movimientos = movimientoServicio.getAllMovimientos();
        return ResponseEntity.ok(new ApiResponse<>(movimientos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Movimiento>> getMovimientoById(@PathVariable Long id) {
        Movimiento movimiento = movimientoServicio.getMovimientoById(id);
        return ResponseEntity.ok(new ApiResponse<>(movimiento));
    }

    @GetMapping("/cuenta/{cuentaId}")
    public ResponseEntity<ApiResponse<List<Movimiento>>> getMovimientosByCuenta(@PathVariable Long cuentaId) {
        List<Movimiento> movimientos = movimientoServicio.getMovimientosByCuenta(cuentaId);
        return ResponseEntity.ok(new ApiResponse<>(movimientos));
    }

    @GetMapping("/reportes")
    public ResponseEntity<ApiResponse<List<Movimiento>>> getMovimientosByFechaAndCliente(
            @RequestParam String fechaInicio,
            @RequestParam String fechaFin,
            @RequestParam Long clienteId) {
        List<Movimiento> movimientos = movimientoServicio
                .getMovimientosByFechaAndCliente(fechaInicio, fechaFin, clienteId);
        return ResponseEntity.ok(new ApiResponse<>(movimientos));
    }
}