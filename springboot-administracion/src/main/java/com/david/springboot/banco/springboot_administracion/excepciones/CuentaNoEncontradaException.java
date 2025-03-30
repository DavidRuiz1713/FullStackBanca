package com.david.springboot.banco.springboot_administracion.excepciones;

public class CuentaNoEncontradaException extends RuntimeException {
    public CuentaNoEncontradaException(String mensaje) {
        super(mensaje);
    }
}