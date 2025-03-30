import { ClientesInterface } from '../interface/clientes-interface';
import { ClientesResponse } from '../modelos/clientes-response';

export class ClientesMapper {
  static map(data: ClientesResponse): ClientesInterface {
    return {
      id: data.id,
      nombre: data.nombre,
      genero: data.genero,
      edad: data.edad,
      identificacion: data.identificacion,
      direccion: data.direccion,
      telefono: data.telefono,
      clienteId: data.clienteId,
      contrasena: data.contrasena,
      estado: data.estado,
    };
  }
}
