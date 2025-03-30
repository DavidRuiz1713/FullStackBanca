/**
 * Servicio principal que contiene toda la logica del crud para los Clientes
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';
import {
  ClientesInterface,
  RespuestaAPI,
} from '../interface/clientes-interface';

import { ClientesMapper } from '../mappers/clientes-mapper';
type RespuestaBase = { [key: string]: unknown };
@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  //Inyectamos el servicio HTTPClient
  private httpClient = inject(HttpClient);
  // Subject para notificar cuando un cliente es agregado
  private clienteSubject = new BehaviorSubject<{
    operacion: string;
    mensaje: string;
    clienteId: string;
  } | null>(null);
  clienteAgregado$ = this.clienteSubject.asObservable();

  // Subject para notificar errores
  private errorSubject = new Subject<string>();
  public error$: Observable<string | null> = this.errorSubject.asObservable();
  private urlPrincipal: string =
    'http://localhost:8080/springboot_administracion/clientes';
  constructor() {}

  /**
   * Método para obtener todos los Clientes desde la api
   * @returns
   */
  obtenerTodosClientes(): Observable<ClientesInterface[]> {
    return this.httpClient.get<RespuestaAPI>(this.urlPrincipal).pipe(
      map((response: RespuestaAPI) => response.data),
      map((clientes: ClientesInterface[]) =>
        clientes.map((cliente) => ClientesMapper.map(cliente)),
      ),
    );
  }

  /**
   * Método para agregar un cliente
   * @returns
   */
  agregarCliente(cliente: any): Observable<any> {
    return this.httpClient.post<any>(this.urlPrincipal, cliente).pipe(
      map((response: any) => {
        // Notificamos que se ha agregado un cliente
        this.clienteSubject.next({
          operacion: 'adicion',
          mensaje: response.message,
          clienteId: cliente.id,
        });
        return response;
      }),
    );
  }

  /**
   * Método para editar un cliente
   * @returns
   */
  editarCliente(cliente: any): Observable<any> {
    const url = this.urlPrincipal + `/${cliente.id}`;
    return this.httpClient.put<any>(url, cliente).pipe(
      map((response: any) => {
        this.clienteSubject.next({
          operacion: 'edicion',
          mensaje: response.message,
          clienteId: cliente.id,
        });
        return response;
      }),
    );
  }

  /**
   * Método para eliminar un cliente por su ID
   *
   * @param id - El ID del cliente que se desea eliminar
   * @returns Observable con la respuesta del servidor
   */
  eliminarCliente(id: string): Observable<any> {
    const url = this.urlPrincipal + `/${id}`;
    return this.httpClient.delete<any>(url).pipe(
      tap((response) => {
        this.clienteSubject.next({
          operacion: 'eliminacion',
          mensaje: response.message,
          clienteId: id,
        });
      }),
    );
  }
  /**
   * Método que consulta si el id está repetido
   * @param id
   * @returns
   */
  consultarIdCliente(id: string): Observable<boolean> {
    const url = `http://localhost:3002/bp/products/verification/${id}`;
    return this.httpClient.get<boolean>(url);
  }

  // Método para limpiar el mensaje
  limpiarMensaje() {
    this.clienteSubject.next(null);
  }
}
