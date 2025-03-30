import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BuscadorComponent } from '../../../buscador/buscador.component';
import { FormsModule } from '@angular/forms';
import { NotificacionComponent } from '../../../notificacion/notificacion.component';
import { LetraInicialPipe } from '../../../../pipes/letra-inicial.pipe';
import { ValidarImagenPipe } from '../../../../pipes/validar-imagen.pipe';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { ClientesInterface } from '../../../../core/interface/clientes-interface';
import { DatosSeleccionadosService } from '../../../../core/servicios/datos-seleccionados.service';
import { ClientesService } from '../../../../core/servicios/clientes.service';
import { MenuContextualComponent } from '../../../menu-contextual/menu-contextual.component';

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [
    CommonModule,
    BuscadorComponent,
    MenuContextualComponent,
    FormsModule,
    NotificacionComponent,
    LetraInicialPipe,
    ValidarImagenPipe,
  ],
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush habilitado
})
export class TablaClientesComponent {
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
  @Input() clientes: ClientesInterface[] = [];

  // Datos quemados para el head de la tabla
  @Input() campos!: { titulo: string }[];

  constructor(
    private datosSeleccionadosService: DatosSeleccionadosService,
    private clientesService: ClientesService,
    private router: Router,
    private detectarCambios: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Suscripción a las notificaciones de cuando se agrega un cliente
    this.clientesService.clienteAgregado$.subscribe((accion) => {
      this.respuestaBackend = accion?.mensaje;
      this.actualizarClientes();
      if (accion != null) {
        this.mostrarYOcultarNotificacion();
      }
      this.detectarCambios.markForCheck(); // Notificamos a Angular que verifique los cambios
    });
  }

  actualizarClientes() {
    this.mostrarDatos = false;
    setTimeout(() => {
      this.clientesService.obtenerTodosClientes().subscribe((clientes) => {
        this.clientes = clientes;
        this.mostrarDatos = true;
        this.detectarCambios.markForCheck(); // Notificamos a Angular que verifique los cambios
      });
    }, 3000);
  }

  onValueChange(nuevoValor: string) {
    this.textoBusquedaComponente = nuevoValor;
    this.textoBusqueda = this.textoBusquedaComponente;
  }

  irAgregarCliente() {
    this.datosSeleccionadosService.clearCliente();
    this.router.navigate(['/agregarClientes']);
    this.clientesService.limpiarMensaje();
  }
  /**
   * Método que filtra los datos obtenidos para ser mostrados en la tabla
   * @returns datos filtrados con la condicional de los campos máximos
   * según seleccione el usuario
   */
  filteredItems() {
    const filtrados = this.clientes.filter((item) =>
      item.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()),
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
