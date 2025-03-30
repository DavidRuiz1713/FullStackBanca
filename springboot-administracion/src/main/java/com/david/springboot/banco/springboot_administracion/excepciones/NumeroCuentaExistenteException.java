package com.david.springboot.banco.springboot_administracion.excepciones;

public class NumeroCuentaExistenteException extends RuntimeException {
    public NumeroCuentaExistenteException(String mensaje) {
        super(mensaje);
    }
}