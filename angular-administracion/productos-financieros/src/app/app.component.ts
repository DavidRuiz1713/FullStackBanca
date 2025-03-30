import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AgregarProductosComponent from './paginas/agregar-productos/agregar-productos.component';
import { NotificacionComponent } from './componentes/notificacion/notificacion.component';
import { MenuComponent } from './componentes/menu/menu.component';

import AgregarCuentasComponent from './paginas/agregar-cuentas/agregar-cuentas.component';
import ClientesComponent from './paginas/clientes/clientes.component';
import CuentasComponent from './paginas/cuentas/cuentas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ClientesComponent,
    AgregarProductosComponent,
    NotificacionComponent,
    MenuComponent,
    CuentasComponent,
    AgregarCuentasComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'administracion-financiera';
}
