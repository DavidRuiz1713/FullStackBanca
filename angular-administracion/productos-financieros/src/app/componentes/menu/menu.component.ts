import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
})
export class MenuComponent {
  items = [
    { name: 'Clientes', route: '/clientes' },
    { name: 'Cuentas', route: '/cuentas' },
    { name: 'Movimientos', route: '/movimientos' },
    { name: 'Reportes', route: '/reportes' },
  ];

  // Inyectamos el servicio Router para poder navegar.
  constructor(private router: Router) {}

  // Método que navega a la ruta correspondiente
  onItemClick(route: string) {
    this.router.navigate([route]);
  }
}
