import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NotificacionesService } from '../../core/servicios/notificaciones.servicio';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificacionComponent implements OnInit {
  public texto: string = '';
  public tipo: string = '';
  public mostrarNotificacion: boolean = false;
  public ocultarNotificacion: boolean = false;
  private detectarCambios = inject(ChangeDetectorRef);
  private notificacionesService = inject(NotificacionesService); // Inyecta el servicio

  ngOnInit() {
    // Suscribirse a las notificaciones
    this.notificacionesService.notificacion$.subscribe((notificacion) => {
      this.texto = notificacion.texto;
      this.tipo = notificacion.tipo;
      this.mostrarYOcultarNotificacion();
      this.detectarCambios.markForCheck();
    });
  }

  mostrarYOcultarNotificacion() {
    this.mostrarNotificacion = true;
    this.ocultarNotificacion = false;

    if (this.tipo != ' ') {
      setTimeout(() => {
        this.ocultarNotificacion = true;
        this.detectarCambios.markForCheck();
      }, 3000);

      setTimeout(() => {
        this.mostrarNotificacion = false;
        this.detectarCambios.markForCheck();
      }, 4000);
    }
  }
}
