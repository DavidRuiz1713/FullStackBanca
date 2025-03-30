export class MovimientosResponse {
  id: string;
  fecha: string;
  tipoMovimiento: string;
  valor: number;
  saldo: number;

  constructor(data: { [key: string]: unknown }) {
    this.id = data['id'] as string;
    this.fecha = data['fecha'] as string;
    this.tipoMovimiento = data['tipoMovimiento'] as string;
    this.valor = data['valor'] as number;
    this.saldo = data['saldo'] as number;
  }
}
