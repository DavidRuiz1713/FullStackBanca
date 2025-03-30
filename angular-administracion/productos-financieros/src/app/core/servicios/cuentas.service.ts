/**
 * Servicio principal que contiene toda la logica del crud para los Cuentas
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
import { CuentasInterface, RespuestaAPI } from '../interface/cuentas-interface';

import { CuentasMapper } from '../mappers/cuentas-mapper';
type RespuestaBase = { [key: string]: unknown };
@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  //Inyectamos el servicio HTTPClient
  private httpClient = inject(HttpClient);
  // Subject para notificar cuando un cuenta es agregado
  private cuentasubject = new BehaviorSubject<{
    operacion: string;
    mensaje: string;
    cuentaId: string;
  } | null>(null);
  cuentaAgregado$ = this.cuentasubject.asObservable();

  // Subject para notificar errores
  private errorSubject = new Subject<string>();
  public error$: Observable<string | null> = this.errorSubject.asObservable();
  private urlPrincipal: string =
    'http://localhost:8080/springboot_administracion/cuentas';
  constructor() {}

  /**
   * Método para obtener todos los Cuentas desde la api
   * @returns
   */
  obtenerTodosCuentas(): Observable<CuentasInterface[]> {
    return this.httpClient.get<RespuestaAPI>(this.urlPrincipal).pipe(
      map((response: RespuestaAPI) => response.data),
      map((cuentas: CuentasInterface[]) =>
        cuentas.map((cuenta) => CuentasMapper.map(cuenta)),
      ),
    );
  }

  /**
   * Método para agregar un cuenta
   * @returns
   */
  agregarCuenta(cuenta: any): Observable<any> {
    return this.httpClient.post<any>(this.urlPrincipal, cuenta).pipe(
      map((response: any) => {
        // Notificamos que se ha agregado un cuenta
        this.cuentasubject.next({
          operacion: 'adicion',
          mensaje: response.message,
          cuentaId: cuenta.id,
        });
        return response;
      }),
    );
  }

  /**
   * Método para editar un cuenta
   * @returns
   */
  editarCuenta(cuenta: any): Observable<any> {
    const url = this.urlPrincipal + `/${cuenta.id}`;
    return this.httpClient.put<any>(url, cuenta).pipe(
      map((response: any) => {
        this.cuentasubject.next({
          operacion: 'edicion',
          mensaje: response.message,
          cuentaId: cuenta.id,
        });
        return response;
      }),
    );
  }

  /**
   * Método para eliminar un cuenta por su ID
   *
   * @param id - El ID del cuenta que se desea eliminar
   * @returns Observable con la respuesta del servidor
   */
  eliminarCuenta(id: string): Observable<any> {
    const url = this.urlPrincipal + `/${id}`;
    return this.httpClient.delete<any>(url).pipe(
      tap((response) => {
        this.cuentasubject.next({
          operacion: 'eliminacion',
          mensaje: response.message,
          cuentaId: id,
        });
      }),
    );
  }
  /**
   * Método que consulta si el id está repetido
   * @param id
   * @returns
   */
  consultarIdCuenta(id: string): Observable<boolean> {
    const url = `http://localhost:3002/bp/products/verification/${id}`;
    return this.httpClient.get<boolean>(url);
  }

  // Método para limpiar el mensaje
  limpiarMensaje() {
    this.cuentasubject.next(null);
  }
}
