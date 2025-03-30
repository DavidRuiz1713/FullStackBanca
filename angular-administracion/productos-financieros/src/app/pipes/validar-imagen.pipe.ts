import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Pipe({
  name: 'validarImagen',
  standalone: true,
})
export class ValidarImagenPipe implements PipeTransform {
  transform(value: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const img = new Image();
      img.src = value;

      img.onload = () => {
        observer.next(true); // Imagen válida
        observer.complete();
      };

      img.onerror = () => {
        observer.next(false); // Imagen inválida
        observer.complete();
      };
    }).pipe(
      catchError(() => of(false)), // Si hay algún error, devuelve false
    );
  }
}
