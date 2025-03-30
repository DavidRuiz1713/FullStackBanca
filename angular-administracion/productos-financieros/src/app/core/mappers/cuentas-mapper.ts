import { CuentasInterface } from '../interface/cuentas-interface';
import { CuentasResponse } from '../modelos/cuentas-response';

export class CuentasMapper {
  static map(data: CuentasResponse): CuentasInterface {
    return {
      id: data.id,
      numeroCuenta: data.numeroCuenta,
      tipoCuenta: data.tipoCuenta,
      saldoInicial: data.saldoInicial,
      estado: data.estado,
    };
  }
}
