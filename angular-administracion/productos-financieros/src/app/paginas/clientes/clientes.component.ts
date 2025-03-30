import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { componentesClientes } from './comonentes/componentes-clientes';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterOutlet, componentesClientes],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.less',
})
export default class ClientesComponent {
  constructor(private router: Router) {}
  //Campos fijos que se usan en la tabla
  public campos: { titulo: string }[] = [
    {
      titulo: 'Nombres',
    },
    {
      titulo: 'Dirección',
    },
    {
      titulo: 'Teléfono',
    },
    {
      titulo: 'Contraseña',
    },
    {
      titulo: 'estado',
    },
  ];
  public irAgregarProductos() {
    this.router.navigate(['/agregarProductos']);
  }
}
