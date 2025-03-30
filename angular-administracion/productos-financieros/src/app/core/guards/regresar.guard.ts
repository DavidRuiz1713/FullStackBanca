import { CanDeactivateFn } from '@angular/router';
import { FormularioClientesComponent } from '../../componentes/formulario/formulario-clientes/formulario-clientes.component';

export const regresarGuard: CanDeactivateFn<FormularioClientesComponent> = (
  component,
) => {
  console.log('Componente:', component);
  if (component.guardRegresar) {
    // Si se detecta cambios en el formulario
    return window.confirm(
      'Tienes cambios no guardados. ¿Estás seguro de que deseas salir?',
    );
  }
  // Si no se detecta cambios en el formulario
  return true;
};
