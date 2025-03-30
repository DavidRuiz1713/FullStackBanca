import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ClientesService } from '../../../core/servicios/clientes.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatosSeleccionadosService } from '../../../core/servicios/datos-seleccionados.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-clientes.component.html',
  styleUrl: './formulario-clientes.component.less',
})
export class FormularioClientesComponent {
  //Inyectamos el servicio
  private clientesService = inject(ClientesService);
  public txtBoton: string = '';
  public clienteEditar: any = {};
  public clienteExiste: boolean | null = null;
  public errorMessage: string | null = null;
  @Output() estadoFormulario = new EventEmitter<boolean>(); // Evento para comunicar el estado
  public guardRegresar: boolean = false;
  public guardarEditarCliente: boolean = false;

  get clienteId() {
    return this.formularioCliente.get('clienteId') as FormControl;
  }
  get nombre() {
    return this.formularioCliente.get('nombre') as FormControl;
  }
  get direccion() {
    return this.formularioCliente.get('direccion') as FormControl;
  }
  get identificacion() {
    return this.formularioCliente.get('identificacion') as FormControl;
  }
  get telefono() {
    return this.formularioCliente.get('telefono') as FormControl;
  }

  get contrasena() {
    return this.formularioCliente.get('contrasena') as FormControl;
  }
  get genero() {
    return this.formularioCliente.get('genero') as FormControl;
  }
  get edad() {
    return this.formularioCliente.get('edad') as FormControl;
  }
  get estado() {
    return this.formularioCliente.get('estado') as FormControl;
  }

  formularioCliente = new FormGroup({
    clienteId: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    identificacion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    edad: new FormControl('', [Validators.required]),
    estado: new FormControl(''),
  });

  constructor(
    private datosSeleccionadosService: DatosSeleccionadosService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formularioCliente.valueChanges.subscribe(() => {
      this.hasChanges(); // Llamar a hasChanges cuando cambian los valores
    });

    // Suscribirse a los errores del servicio
    this.clientesService.error$.subscribe((error) => {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        this.errorMessage = (error as { message: string }).message;
      } else if (typeof error === 'string') {
        this.errorMessage = error;
      } else {
        this.errorMessage = 'Error desconocido';
      }
    });

    this.clienteEditar = this.datosSeleccionadosService.getCliente();
    if (this.clienteEditar != undefined) {
      this.clienteId.disable();
      this.txtBoton = 'Editar';
      this.formularioCliente.patchValue(this.clienteEditar);
    } else {
      this.txtBoton = 'Agregar';
    }
  }

  agregarCliente(accion: string): void {
    this.guardarEditarCliente = true;
    let procedimiento = accion;
    if (procedimiento === 'Agregar') {
      const nuevoCliente = {
        ...this.formularioCliente.value,
        estado: true, // Añadir estado activo por defecto
      };
      this.clientesService
        .agregarCliente(nuevoCliente)
        .subscribe((response) => {
          this.router.navigate(['']);
        });
    } else {
      this.clienteId.enable();

      const clienteEditado = this.formularioCliente.value;
      this.clientesService
        .editarCliente(clienteEditado)
        .subscribe((response) => {
          this.router.navigate(['']);
        });
    }
  }

  async consultarCliente(id: string) {
    if (id != '') {
      this.clientesService.consultarIdCliente(id).subscribe({
        next: (existe: boolean) => {
          this.clienteExiste = existe;
          console.log('verificar el cliente:', this.clienteExiste);
        },
        error: (err) => {
          console.error('Error al verificar el cliente:', err);
          this.clienteExiste = null;
        },
      });
    }
  }

  borrarFormulario(accion: string): void {
    if (accion === 'Editar') {
      this.formularioCliente.patchValue({
        nombre: '',
        direccion: '',
        identificacion: '',
        telefono: '',
        contrasena: '',
      });
    } else {
      this.formularioCliente.reset();
    }
    this.errorMessage = null;
  }

  hasChanges() {
    if (this.guardarEditarCliente) {
      this.guardRegresar = false;
      this.estadoFormulario.emit(this.guardRegresar);
      return this.formularioCliente.pristine;
    } else {
      this.guardRegresar = this.formularioCliente.dirty;
      this.estadoFormulario.emit(this.guardRegresar);
      return this.formularioCliente.pristine;
    }
  }
}
