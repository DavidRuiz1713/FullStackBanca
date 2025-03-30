/**
 * PIPE PARA TOMAR LAS INICIALES DE LAS PALABRAS DE UNA FRASE
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letraInicial',
  standalone: true,
})
export class LetraInicialPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const palabras = value.split(' ');
    const primerasDosPalabras = palabras.slice(0, 2);
    const iniciales = primerasDosPalabras.map((letra) =>
      letra.charAt(0).toUpperCase(),
    );
    return iniciales.join('');
  }
}
