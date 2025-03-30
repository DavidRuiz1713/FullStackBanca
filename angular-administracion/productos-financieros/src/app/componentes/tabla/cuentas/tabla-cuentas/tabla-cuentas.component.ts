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
import { CuentasInterface } from '../../../../core/interface/cuentas-interface';
import { DatosSeleccionadosService } from '../../../../core/servicios/datos-seleccionados.service';
import { CuentasService } from '../../../../core/servicios/cuentas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-cuentas',
  standalone: true,
  imports: [
    CommonModule,
    BuscadorComponent,
    MenuContextualComponent,
    FormsModule,
    NotificacionComponent,
  ],
  templateUrl: './tabla-cuentas.component.html',
  styleUrl: './tabla-cuentas.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush habilitado
})
export class TablaCuentasComponent {
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
  @Input() cuentas: CuentasInterface[] = [];

  // Datos quemados para el head de la tabla
  @Input() campos!: { titulo: string }[];

  constructor(
    private datosSeleccionadosService: DatosSeleccionadosService,
    private cuentasService: CuentasService,
    private router: Router,
    private detectarCambios: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Suscripción a las notificaciones de cuando se agrega un cuenta
    this.cuentasService.cuentaAgregado$.subscribe((accion) => {
      this.respuestaBackend = accion?.mensaje;
      this.actualizarCuentas();
      if (accion != null) {
        this.mostrarYOcultarNotificacion();
      }
      this.detectarCambios.markForCheck(); // Notificamos a Angular que verifique los cambios
    });
  }

  actualizarCuentas() {
    this.mostrarDatos = false;
    setTimeout(() => {
      this.cuentasService.obtenerTodosCuentas().subscribe((cuentas) => {
        this.cuentas = cuentas;
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
    this.router.navigate(['/agregarCuentas']);
    this.cuentasService.limpiarMensaje();
  }
  /**
   * Método que filtra los datos obtenidos para ser mostrados en la tabla
   * @returns datos filtrados con la condicional de los campos máximos
   * según seleccione el usuario
   */
  filteredItems() {
    const filtrados = this.cuentas.filter((item) =>
      item.numeroCuenta
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
