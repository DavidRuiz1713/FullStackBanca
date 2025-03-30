export interface MovimientosInterface {
  id: string;
  fecha: string;
  tipoMovimiento: string;
  valor: number;
  saldo: number;
}

export interface RespuestaAPI {
  data: MovimientosInterface[];
}
