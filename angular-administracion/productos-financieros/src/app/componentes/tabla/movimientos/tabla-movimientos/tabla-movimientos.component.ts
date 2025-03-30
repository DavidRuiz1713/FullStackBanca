import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { BuscadorComponent } from '../../../buscador/buscador.component';
import { MenuContextualComponent } from '../../../menu-contextual/menu-contextual.component';
import { FormsModule } from '@angular/forms';
import { NotificacionComponent } from '../../../notificacion/notificacion.component';
import { DatosSeleccionadosService } from '../../../../core/servicios/datos-seleccionados.service';
import { MovimientosService } from '../../../../core/servicios/movimientos.service';
import { Router } from '@angular/router';
import { MovimientosInterface } from '../../../../core/interface/movimientos-interface';

@Component({
  selector: 'app-tabla-movimientos',
  standalone: true,
  imports: [
    CommonModule,
    BuscadorComponent,
    MenuContextualComponent,
    FormsModule,
    NotificacionComponent,
  ],
  templateUrl: './tabla-movimientos.component.html',
  styleUrl: './tabla-movimientos.component.less',
})
export class TablaMovimientosComponent {
  //variables
  public textoBusqueda: string = '';
  public itemsPorPagina: number = 5;
  public cantidadItems = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
  ];
  public textoBusquedaComponente: string = '';
  public respuestaBackend?: string = '';
  public mostrarNotificacion: boolean = false;
  public ocultarNotificacion: boolean = false;
  public mostrarDatos: boolean = false;
  public errorMessage: string = '';

  // Datos obtenidos del servicio
  @Input() movimientos: MovimientosInterface[] = [];

  // Datos quemados para el head de la tabla
  @Input() campos!: { titulo: string }[];

  constructor(
    private datosSeleccionadosService: DatosSeleccionadosService,
    private movimientosService: MovimientosService,
    private router: Router,
    private detectarCambios: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Suscripción a las notificaciones de cuando se agrega un cuenta
    this.movimientosService.movimientoAgregado$.subscribe((accion) => {
      this.respuestaBackend = accion?.mensaje;
      this.actualizarMovimientos();
      if (accion != null) {
        this.mostrarYOcultarNotificacion();
      }
      this.detectarCambios.markForCheck(); // Notificamos a Angular que verifique los cambios
    });
  }

  actualizarMovimientos() {
    this.mostrarDatos = false;
    setTimeout(() => {
      this.movimientosService
        .obtenerTodosMovimientos()
        .subscribe((movimientos) => {
          this.movimientos = movimientos;
          this.mostrarDatos = true;
          this.detectarCambios.markForCheck(); // Notificamos a Angular que verifique los cambios
        });
    }, 3000);
  }

  onValueChange(nuevoValor: string) {
    this.textoBusquedaComponente = nuevoValor;
    this.textoBusqueda = this.textoBusquedaComponente;
  }

  irAgregarCuenta() {
    this.datosSeleccionadosService.clearCuenta();
    this.router.navigate(['/agregarMovimientos']);
    this.movimientosService.limpiarMensaje();
  }
  /**
   * Método que filtra los datos obtenidos para ser mostrados en la tabla
   * @returns datos filtrados con la condicional de los campos máximos
   * según seleccione el usuario
   */
  filteredItems() {
    const filtrados = this.movimientos.filter((item) =>
      item.tipoMovimiento
        .toLowerCase()
        .includes(this.textoBusqueda.toLowerCase()),
    );
    return filtrados.slice(0, this.itemsPorPagina);
  }

  mostrarYOcultarNotificacion() {
    this.mostrarNotificacion = true;
    this.ocultarNotificacion = false;
    setTimeout(() => {
      this.ocultarNotificacion = true;
    }, 3000);
    setTimeout(() => {
      this.mostrarNotificacion = false;
    }, 4000);
  }
}
