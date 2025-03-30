export interface ClientesInterface {
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
}

export interface RespuestaAPI {
  data: ClientesInterface[];
}
