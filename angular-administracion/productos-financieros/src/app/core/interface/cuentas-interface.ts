export interface CuentasInterface {
  id: string;
  numeroCuenta: string;
  tipoCuenta: string;
  saldoInicial: number;
  estado: boolean;
}

export interface RespuestaAPI {
  data: CuentasInterface[];
}
