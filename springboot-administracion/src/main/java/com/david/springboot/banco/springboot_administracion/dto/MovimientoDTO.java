package com.david.springboot.banco.springboot_administracion.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// import java.util.Date;

@Data
public class MovimientoDTO {
    @NotBlank
    private String tipoMovimiento;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal valor;

    @NotNull
    private Long cuentaId; // Solo necesitamos el ID
}