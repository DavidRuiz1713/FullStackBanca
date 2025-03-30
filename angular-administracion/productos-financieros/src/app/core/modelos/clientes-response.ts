export class ClientesResponse {
  id: string;
  nombre: string;
  genero: string;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
  clienteId: string;
  contrasena: string;
  estado: boolean;

  constructor(data: { [key: string]: unknown }) {
    this.id = data['id'] as string;
    this.nombre = data['name'] as string;
    this.genero = data['genero'] as string;
    this.edad = data['edad'] as number;
    this.identificacion = data['identificacion'] as string;
    this.direccion = data['direccion'] as string;
    this.telefono = data['telefono'] as string;
    this.clienteId = data['clienteId'] as string;
    this.contrasena = data['contrasena'] as string;
    this.estado = data['estado'] as boolean;
  }
}
