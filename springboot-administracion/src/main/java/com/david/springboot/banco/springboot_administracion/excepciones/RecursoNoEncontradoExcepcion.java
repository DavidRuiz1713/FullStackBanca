package com.david.springboot.banco.springboot_administracion.excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción lanzada cuando un recurso no se encuentra en la base de datos.
 * Automáticamente devuelve un HTTP 404 (NOT FOUND) cuando se lanza.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class RecursoNoEncontradoExcepcion extends RuntimeException {

    public RecursoNoEncontradoExcepcion() {
        super();
    }

    public RecursoNoEncontradoExcepcion(String message) {
        super(message);
    }

    public RecursoNoEncontradoExcepcion(String message, Throwable cause) {
        super(message, cause);
    }
}