package com.david.springboot.banco.springboot_administracion.respuestas;

public class ApiResponse<T> {
    private T data;

    public ApiResponse(T data) {
        this.data = data;
    }

    // Getters y setters
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}