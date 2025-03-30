import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ChangeDetectorRef, // Importamos ChangeDetectorRef
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ClientesService } from '../../core/servicios/clientes.service';
import { NotificacionComponent } from '../notificacion/notificacion.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NotificacionComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  // Inyectamos el servicio
  private clientesService = inject(ClientesService);
  private detectarCambios = inject(ChangeDetectorRef);

  modalVisible: boolean = false;

  // Datos obtenidos de cada elemento
  @Input() id: string = '';
  public errorMessage: string = '';
  public modalErrorVisible: boolean = false;

  ngOnInit() {
    // Suscripción para los errores del servicio
    this.clientesService.error$.subscribe((error) => {
      if (error) {
        this.errorMessage = error;
        this.detectarCambios.markForCheck();
      }
    });
  }

  mostrarModal() {
    this.modalVisible = true;
    this.detectarCambios.markForCheck();
  }

  ocultarModal() {
    this.modalVisible = false;
    this.clientesService.limpiarMensaje();
    this.detectarCambios.markForCheck();
  }

  eliminarElemento() {
    this.clientesService.eliminarCliente(this.id).subscribe({
      next: (response) => {
        this.modalVisible = false;
        this.detectarCambios.markForCheck();
      },
      error: (error) => {
        this.ocultarModal();
      },
    });
  }
}
