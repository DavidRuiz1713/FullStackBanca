import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormularioClientesComponent } from '../../componentes/formulario/formulario-clientes/formulario-clientes.component';

@Component({
  selector: 'app-agregar-productos',
  standalone: true,
  imports: [CommonModule, FormularioClientesComponent],
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.less'],
})
export default class AgregarProductosComponent {
  constructor(private router: Router) {}
  public guardRegresar: boolean = false; // Propiedad para el guardia
  public irAProductos() {
    this.router.navigate(['clientes']);
  }
  // Método para actualizar el estado del formulario
  public actualizarEstadoFormulario(estado: boolean) {
    this.guardRegresar = estado;
  }
}
