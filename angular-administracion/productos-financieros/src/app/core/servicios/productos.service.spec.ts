import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductosService } from './clientes.service';

describe('ProductosService', () => {
  let service: ProductosService;
  let httpMock: HttpTestingController;

  const productoPrueba = {
    id: 'trj-crd',
    name: 'Tarjeta de credito',
    description: 'Tarjeta de consumo bajo la modalidad de crédito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2024-02-01',
    date_revision: '2025-02-01',
  };

  const respuestaExitosa = { message: 'Producto agregado correctamente' };
  const mensajeError = 'Error al agregar el producto';
  const respuestaEdicion = { message: 'Producto editado correctamente' };
  const respuestaEliminacion = { message: 'Producto eliminado correctamente' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductosService],
    });

    service = TestBed.inject(ProductosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Agrega un producto ', () => {
    service.agregarProducto(productoPrueba).subscribe((res) => {
      expect(res).toEqual(respuestaExitosa);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('POST');
    req.flush(respuestaExitosa);
  });

  it('Maneja el error de la solicitud al agregar producto correctamente', () => {
    service.agregarProducto(productoPrueba).subscribe({
      next: () => fail('La llamada fallo'),
      error: (error) => {
        expect(error).toBe(mensajeError);
      },
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('POST');
    req.flush(mensajeError, { status: 400, statusText: 'Bad Request' });
  });

  it('Edita un producto ', () => {
    service.editarProducto(productoPrueba).subscribe((res) => {
      expect(res).toEqual(respuestaEdicion);
    });

    const req = httpMock.expectOne(
      `http://localhost:3002/bp/products/${productoPrueba.id}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(respuestaEdicion);
  });

  it('Maneja el error de la solicitud de edición del producto correctamente', () => {
    service.editarProducto(productoPrueba).subscribe({
      next: () => fail('La llamada fallo'),
      error: (error) => {
        expect(error).toBe(mensajeError);
      },
    });

    const req = httpMock.expectOne(
      `http://localhost:3002/bp/products/${productoPrueba.id}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mensajeError, { status: 400, statusText: 'Bad Request' });
  });

  it('Elimina un producto ', () => {
    const productoId = 'trj-crd';

    service.eliminarProducto(productoId).subscribe((res) => {
      expect(res).toEqual(respuestaEliminacion);
    });

    const req = httpMock.expectOne(
      `http://localhost:3002/bp/products/${productoId}`,
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(respuestaEliminacion);
  });

  it('Maneja el error de la solicitud de eliminación del producto correctamente', () => {
    const productoId = 'trj-crd';

    service.eliminarProducto(productoId).subscribe({
      next: () => fail('La llamada fallo'),
      error: (error) => {
        expect(error).toBe(mensajeError);
      },
    });

    const req = httpMock.expectOne(
      `http://localhost:3002/bp/products/${productoId}`,
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mensajeError, { status: 400, statusText: 'Bad Request' });
  });

  it('Limpia el mensaje', () => {
    jest.spyOn(service['productSubject'], 'next');
    service.limpiarMensaje();
    expect(service['productSubject'].next).toHaveBeenCalledWith(null);
  });
});
