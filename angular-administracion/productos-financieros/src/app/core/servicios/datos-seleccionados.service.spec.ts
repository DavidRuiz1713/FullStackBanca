import { TestBed } from '@angular/core/testing';
import { DatosSeleccionadosService } from './datos-seleccionados.service';

describe('DatosSeleccionadosService', () => {
  let service: DatosSeleccionadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatosSeleccionadosService],
    });
    service = TestBed.inject(DatosSeleccionadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería almacenar un producto con setProducto y recuperarlo con getProducto', () => {
    const productoPrueba = {
      id: 'trj-crd',
      name: 'Tarjeta de credito',
      description: 'Tarjeta de consumo bajo la modalidad de crédito',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2024-02-01',
      date_revision: '2025-02-01',
    };

    service.setProducto(productoPrueba);
    expect(service.getProducto()).toEqual(productoPrueba);
  });

  it('debería limpiar el producto con clearProducto', () => {
    const productoPrueba = {
      id: 'trj-crd-1',
      name: 'Tarjeta de credito',
      description: 'Tarjeta de consumo bajo la modalidad de crédito',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2024-02-01',
      date_revision: '2025-02-01',
    };

    service.setProducto(productoPrueba);
    expect(service.getProducto()).toEqual(productoPrueba);

    service.clearProducto();
    expect(service.getProducto()).toBeNull();
  });
});
