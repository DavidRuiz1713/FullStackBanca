package com.david.springboot.banco.springboot_administracion.excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción lanzada cuando se intenta crear un recurso que ya existe.
 * Automáticamente devuelve un HTTP 409 (CONFLICT) cuando se lanza.
 */
@ResponseStatus(value = HttpStatus.CONFLICT)
public class RecursoYaExisteExcepcion extends RuntimeException {

    public RecursoYaExisteExcepcion() {
        super();
    }

    public RecursoYaExisteExcepcion(String message) {
        super(message);
    }

    public RecursoYaExisteExcepcion(String message, Throwable cause) {
        super(message, cause);
    }
}