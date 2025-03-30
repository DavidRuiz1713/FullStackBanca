import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { DatosSeleccionadosService } from '../../core/servicios/datos-seleccionados.service';
import { ClientesService } from '../../core/servicios/clientes.service';

@Component({
  selector: 'app-menu-contextual',
  standalone: true,
  imports: [CommonModule, ModalComponent, HttpClientModule],
  templateUrl: './menu-contextual.component.html',
  styleUrls: ['./menu-contextual.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContextualComponent {
  public isMenuOpen = false;
  private menuActivo?: HTMLElement;

  constructor(
    private datosSeleccionadosService: DatosSeleccionadosService,
    private router: Router,
    private clientesService: ClientesService,
    private elRef: ElementRef,
  ) {}
  //Datos a enviar para la edición
  @Output() onEdit = new EventEmitter<void>();
  // Datos obtenidos de cada producto
  @Input() producto: any;

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  toggleMenu(): void {
    if (!this.isMenuOpen) {
      this.isMenuOpen = !this.isMenuOpen;
      this.menuActivo =
        this.elRef.nativeElement.querySelector('.menu-contextual');
    }
  }

  cerrarMenus(): void {
    if (this.isMenuOpen) this.isMenuOpen = !this.isMenuOpen;
  }
  editarProducto(): void {
    this.isMenuOpen = false;
    this.router.navigate(['/editarCliente']);
    this.datosSeleccionadosService.setCliente(this.producto);
    this.clientesService.limpiarMensaje();
  }

  eliminarProducto(): void {
    this.isMenuOpen = false;
    this.modalComponent.mostrarModal();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const iconoMenu = this.elRef.nativeElement.querySelector(
      '.menu-contextual-activo',
    );
    if (this.menuActivo && !this.menuActivo.contains(clickedElement)) {
      this.cerrarMenus();
    }
    if (!clickedElement.classList.contains('menu-contextual-activo')) {
      this.cerrarMenus();
    }
  }
}
