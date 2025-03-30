import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { componentesCuentas } from './componentes/componentes-cuentas';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule, RouterOutlet, componentesCuentas],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.less',
})
export default class CuentasComponent {
  constructor(private router: Router) {}
  //Campos fijos que se usan en la tabla
  public campos: { titulo: string }[] = [
    {
      titulo: 'Cuenta',
    },
    {
      titulo: 'Tipo',
    },
    {
      titulo: 'Saldo',
    },
    {
      titulo: 'estado',
    },
  ];
  // public irAgregarProductos() {
  //   this.router.navigate(['/agregarProductos']);
  // }
}
