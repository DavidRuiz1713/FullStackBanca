import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private notificacionesSubject = new Subject<{
    texto: string;
    tipo: string;
  }>();
  notificacion$ = this.notificacionesSubject.asObservable(); // Coloco un observable para usar un componente

  mostrarNotificacion(texto: string, tipo: string): void {
    this.notificacionesSubject.next({ texto, tipo }); // Emite la notificación
  }
}
