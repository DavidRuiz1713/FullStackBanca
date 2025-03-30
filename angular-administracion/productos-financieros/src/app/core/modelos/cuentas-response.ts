export class CuentasResponse {
  id: string;
  numeroCuenta: string;
  tipoCuenta: string;
  saldoInicial: number;
  estado: boolean;

  constructor(data: { [key: string]: unknown }) {
    this.id = data['id'] as string;
    this.numeroCuenta = data['name'] as string;
    this.tipoCuenta = data['genero'] as string;
    this.saldoInicial = data['edad'] as number;
    this.estado = data['estado'] as boolean;
  }
}
