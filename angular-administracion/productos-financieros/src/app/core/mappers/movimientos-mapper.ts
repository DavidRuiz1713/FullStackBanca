import { MovimientosInterface } from '../interface/movimientos-interface';
import { MovimientosResponse } from '../modelos/movimientos-response';

export class MovimientosMapper {
  static map(data: MovimientosResponse): MovimientosInterface {
    return {
      id: data.id,
      fecha: data.fecha,
      tipoMovimiento: data.tipoMovimiento,
      valor: data.valor,
      saldo: data.saldo,
    };
  }
}
