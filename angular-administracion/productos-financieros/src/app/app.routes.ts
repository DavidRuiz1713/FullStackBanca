import { Routes } from '@angular/router';
import { regresarGuard } from './core/guards/regresar.guard';

/**
 * Configuracion de rutas para la aplicacion
 */
export const routes: Routes = [
  {
    path: 'clientes',
    loadComponent: () => import('./paginas/clientes/clientes.component'),
  },
  {
    path: 'agregarClientes',
    loadComponent: () =>
      import('./paginas/agregar-productos/agregar-productos.component'),
    canDeactivate: [regresarGuard],
  },
  {
    path: 'editarCliente',
    loadComponent: () =>
      import('./paginas/agregar-productos/agregar-productos.component'),
    canDeactivate: [regresarGuard],
  },
  {
    path: 'cuentas',
    loadComponent: () => import('./paginas/cuentas/cuentas.component'),
  },
  {
    path: 'agregarCuentas',
    loadComponent: () =>
      import('./paginas/agregar-cuentas/agregar-cuentas.component'),
    canDeactivate: [regresarGuard],
  },
  {
    path: 'movimientos',
    loadComponent: () => import('./paginas/movimientos/movimientos.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./paginas/clientes/clientes.component'),
  },
];
