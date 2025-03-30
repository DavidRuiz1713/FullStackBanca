/**
 * Servicio principal que contiene toda la logica del crud para los Movimientos
 */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  MovimientosInterface,
  RespuestaAPI,
} from '../interface/movimientos-interface';
import { MovimientosMapper } from '../mappers/movimientos-mapper';

type RespuestaBase = { [key: string]: unknown };
@Injectable({
  providedIn: 'root',
})
export class MovimientosService {
  //Inyectamos el servicio HTTPClient
  private httpClient = inject(HttpClient);
  // Subject para notificar cuando un movimientos es agregado
  private movimientosubject = new BehaviorSubject<{
    operacion: string;
    mensaje: string;
    movimientosId: string;
  } | null>(null);
  movimientoAgregado$ = this.movimientosubject.asObservable();

  // Subject para notificar errores
  private errorSubject = new Subject<string>();
  public error$: Observable<string | null> = this.errorSubject.asObservable();
  private urlPrincipal: string =
    'http://localhost:8080/springboot_administracion/movimientos';
  constructor() {}

  /**
   * Método para obtener todos los movimientos desde la api
   * @returns
   */
  obtenerTodosMovimientos(): Observable<MovimientosInterface[]> {
    return this.httpClient.get<RespuestaAPI>(this.urlPrincipal).pipe(
      map((response: RespuestaAPI) => response.data),
      map((movimientos: MovimientosInterface[]) =>
        movimientos.map((movimientos) => MovimientosMapper.map(movimientos)),
      ),
    );
  }

  /**
   * Método para agregar un movimientos
   * @returns
   */
  agregarMovimiento(movimiento: any): Observable<any> {
    return this.httpClient.post<any>(this.urlPrincipal, movimiento).pipe(
      map((response: any) => {
        // Notificamos que se ha agregado un movimiento
        this.movimientosubject.next({
          operacion: 'adicion',
          mensaje: response.message,
          movimientosId: movimiento.id,
        });
        return response;
      }),
    );
  }

  /**
   * Método para editar un movimiento
   * @returns
   */
  editarMovimiento(movimiento: any): Observable<any> {
    const url = this.urlPrincipal + `/${movimiento.id}`;
    return this.httpClient.put<any>(url, movimiento).pipe(
      map((response: any) => {
        this.movimientosubject.next({
          operacion: 'edicion',
          mensaje: response.message,
          movimientosId: movimiento.id,
        });
        return response;
      }),
    );
  }

  /**
   * Método para eliminar un movimiento por su ID
   *
   * @param id - El ID del movimiento que se desea eliminar
   * @returns Observable con la respuesta del servidor
   */
  eliminarMovimiento(id: string): Observable<any> {
    const url = this.urlPrincipal + `/${id}`;
    return this.httpClient.delete<any>(url).pipe(
      tap((response) => {
        this.movimientosubject.next({
          operacion: 'eliminacion',
          mensaje: response.message,
          movimientosId: id,
        });
      }),
    );
  }
  /**
   * Método que consulta si el id está repetido
   * @param id
   * @returns
   */
  consultarIdMovimiento(id: string): Observable<boolean> {
    const url = `http://localhost:8080/springboot_administracion/movimientos/cuenta/${id}`;
    return this.httpClient.get<boolean>(url);
  }

  obtenerReporteMovimientos(
    fechaInicio: string,
    fechaFin: string,
    clienteId: number,
  ): Observable<MovimientosInterface[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin)
      .set('clienteId', clienteId.toString());

    return this.httpClient
      .get<RespuestaAPI>(`${this.urlPrincipal}/reportes`, { params })
      .pipe(
        map((response) => response.data),
        map((movimientos) => movimientos.map(MovimientosMapper.map)),
      );
  }

  // Método para limpiar el mensaje
  limpiarMensaje() {
    this.movimientosubject.next(null);
  }
}
