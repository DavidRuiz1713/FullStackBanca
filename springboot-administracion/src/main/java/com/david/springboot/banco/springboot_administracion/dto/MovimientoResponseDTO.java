package com.david.springboot.banco.springboot_administracion.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MovimientoResponseDTO {
    private Long id;
    private LocalDateTime fecha;
    private String tipoMovimiento;
    private BigDecimal valor;
    private BigDecimal saldo;
    private Long cuentaId;
}
