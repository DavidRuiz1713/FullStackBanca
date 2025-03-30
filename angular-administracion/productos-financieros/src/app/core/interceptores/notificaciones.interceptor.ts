import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { NotificacionesService } from '../servicios/notificaciones.servicio';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const notificacionesInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const notificacionesService = inject(NotificacionesService); // Inyecto el servicio de notificaciones

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      // Intercepta respuestas exitosas (código 200)
      if (event instanceof HttpResponse && event.status === 200) {
        const responseBody = event.body; // Obtén el cuerpo de la respuesta
        if (responseBody && responseBody.message) {
          // Emitir el mensaje de éxito a través del servicio
          notificacionesService.mostrarNotificacion(
            responseBody.message,
            'correcta',
          );
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      // Intercepta respuestas erroneas)
      let errorMessage = 'Ocurrió un error inesperado.';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error del cliente: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 404:
            errorMessage = error.error.message;
            router.navigate(['/no-encontrado']);
            break;
          case 400:
            errorMessage = error.error.message;
            break;
          default:
            errorMessage = errorMessage;
            break;
        }
      }
      // Emitir el mensaje de error a través del servicio
      notificacionesService.mostrarNotificacion(errorMessage, 'error');
      return throwError(() => error);
    }),
  );
};
