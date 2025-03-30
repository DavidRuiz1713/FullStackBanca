// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { Router, RouterOutlet } from '@angular/router';
// import { componentesProductos } from './componentes/componentes-productos';
// import { ProductosService } from '../../core/servicios/clientes.service';

// @Component({
//   selector: 'app-productos',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, componentesProductos],
//   templateUrl: './productos.component.html',
//   styleUrls: ['./productos.component.less'],
// })
// export default class ProductosComponent {
//   constructor(private router: Router) {}
//   //Campos fijos que se usan en la tabla
//   public campos: { titulo: string }[] = [
//     {
//       titulo: 'Nombres',
//     },
//     {
//       titulo: 'Dirección',
//     },
//     {
//       titulo: 'Teléfono',
//     },
//     {
//       titulo: 'Contraseña',
//     },
//     {
//       titulo: 'estado',
//     },
//   ];
//   public irAgregarProductos() {
//     this.router.navigate(['/agregarProductos']);
//   }
// }
