import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from '../buscador/buscador.component';
import { ProductosInterface } from '../../core/interface/clientes-interface';
import { ProductosService } from '../../core/servicios/clientes.service';
import { Router } from '@angular/router';
import { DatosSeleccionadosService } from '../../core/servicios/datos-seleccionados.service';
import { MenuContextualComponent } from '../menu-contextual/menu-contextual.component';
import { FormsModule } from '@angular/forms';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { ValidarImagenPipe } from '../../pipes/validar-imagen.pipe';
import { LogoGenericoComponent } from '../logo-generico/logo-generico.component';
import { LetraInicialPipe } from '../../pipes/letra-inicial.pipe';

@Component({
  selector: 'app-tabla-productos',
  standalone: true,
  imports: [
    CommonModule,
    BuscadorComponent,
    MenuContextualComponent,
    FormsModule,
    NotificacionComponent,
    LogoGenericoComponent,
    LetraInicialPipe,
    ValidarImagenPipe,
  ],
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush habilitado
})
export class TablaProductosComponent {
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
  @Input() productos: ProductosInterface[] = [];

  // Datos quemados para el head de la tabla
  @Input() campos!: { titulo: string }[];

  constructor(
    private datosSeleccionadosService: DatosSeleccionadosService,
    private productosService: ProductosService,
    private router: Router,
    private detectarCambios: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Suscripción a las notificaciones de cuando se agrega un producto
    this.productosService.productoAgregado$.subscribe((accion) => {
      this.respuestaBackend = accion?.mensaje;
      this.actualizarProductos();
      if (accion != null) {
        this.mostrarYOcultarNotificacion();
      }
      this.detectarCambios.markForCheck(); // Notificamos a Angular que verifique los cambios
    });
  }

  actualizarProductos() {
    this.mostrarDatos = false;
    setTimeout(() => {
      this.productosService.obtenerTodosProductos().subscribe((productos) => {
        this.productos = productos;
        this.mostrarDatos = true;
        this.detectarCambios.markForCheck(); // Notificamos a Angular que verifique los cambios
      });
    }, 3000);
  }

  onValueChange(nuevoValor: string) {
    this.textoBusquedaComponente = nuevoValor;
    this.textoBusqueda = this.textoBusquedaComponente;
  }

  irAgregarProducto() {
    this.datosSeleccionadosService.clearProducto();
    this.router.navigate(['/agregarProductos']);
    this.productosService.limpiarMensaje();
  }
  /**
   * Método que filtra los datos obtenidos para ser mostrados en la tabla
   * @returns datos filtrados con la condicional de los campos máximos
   * según seleccione el usuario
   */
  filteredItems() {
    const filtrados = this.productos.filter((item) =>
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
