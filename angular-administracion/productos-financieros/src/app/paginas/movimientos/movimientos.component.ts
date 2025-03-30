import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { componentesMovimientos } from './componentes/componentes-movimientos';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, componentesMovimientos],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.less',
})
export default class MovimientosComponent {
  constructor(private router: Router) {}
  //Campos fijos que se usan en la tabla
  public campos: { titulo: string }[] = [
    {
      titulo: 'Fecha',
    },
    {
      titulo: 'Movimiento',
    },
    {
      titulo: 'Valor',
    },
    {
      titulo: 'Saldo',
    },
  ];
  // public irAgregarProductos() {
  //   this.router.navigate(['/agregarProductos']);
  // }
}
