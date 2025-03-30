/**
 * Servicio que permite intercambiar datos de la seleccion de un determindado
 * cliente entre varios componentes que no tengan relacion
 */
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosSeleccionadosService {
  // Coloco un señal en vez de una variable normal
  private cliente = signal<any>(null);
  private cuenta = signal<any>(null);

  // Método para actualizar el cliente
  setCliente(cliente: any): void {
    this.cliente.set(cliente);
  }

  // Método para obtener el valor actual del cliente
  getCliente(): any {
    return this.cliente();
  }

  // Método para obtener la señal completa
  getClienteSignal() {
    return this.cliente;
  }

  // Método para limpiar el cliente
  clearCliente(): void {
    this.cliente.set(null);
  }
  // Método para limpiar el cuenta
  clearCuenta(): void {
    this.cuenta.set(null);
  }
}
