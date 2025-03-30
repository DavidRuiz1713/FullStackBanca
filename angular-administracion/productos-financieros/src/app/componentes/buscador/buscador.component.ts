import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.less'],
})
export class BuscadorComponent {
  @Output() valueChange = new EventEmitter<string>();
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
