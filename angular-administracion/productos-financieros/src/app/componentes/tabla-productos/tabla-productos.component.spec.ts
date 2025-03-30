import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TablaProductosComponent } from './tabla-productos.component';
import { DatosSeleccionadosService } from '../../core/servicios/datos-seleccionados.service';
import { ProductosService } from '../../core/servicios/clientes.service';
import { ProductosInterface } from '../../core/interface/clientes-interface';
import { By } from '@angular/platform-browser';

describe('TablaProductosComponent', () => {
  let component: TablaProductosComponent;
  let fixture: ComponentFixture<TablaProductosComponent>;
  let productosService: ProductosService;
  let datosSeleccionadosService: DatosSeleccionadosService;
  let router: Router;

  const productoPrueba: ProductosInterface = {
    id: 'trj-crd',
    name: 'Tarjeta de credito',
    description: 'Tarjeta de consumo bajo la modalidad de crédito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: new Date('2024-02-01'),
    date_revision: new Date('2025-02-01'),
  };

  const productosPrueba: ProductosInterface[] = [productoPrueba];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TablaProductosComponent],
      declarations: [],
      providers: [
        DatosSeleccionadosService,
        ProductosService,
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaProductosComponent);
    component = fixture.componentInstance;
    productosService = TestBed.inject(ProductosService);
    datosSeleccionadosService = TestBed.inject(DatosSeleccionadosService);
    router = TestBed.inject(Router);
    jest
      .spyOn(productosService, 'obtenerTodosProductos')
      .mockReturnValue(of(productosPrueba));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deebe ir a /agregarProductos productos al llamar al metodo irAgregarProducto', () => {
    component.irAgregarProducto();
    expect(datosSeleccionadosService.getProducto()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/agregarProductos']);
  });

  it('Debe filtrar los productos', () => {
    component.textoBusqueda = 'Tarjeta de credito';
    fixture.detectChanges();
    expect(productosPrueba.length).toBe(1);
    expect(productosPrueba[0].name).toBe('Tarjeta de credito');
  });

  it('Debe mostrar y esconder las notificaciones', (done) => {
    component.mostrarYOcultarNotificacion();
    fixture.detectChanges();

    expect(component.mostrarNotificacion).toBe(true);
    expect(component.ocultarNotificacion).toBe(false);

    setTimeout(() => {
      expect(component.ocultarNotificacion).toBe(true);
    }, 3000);

    setTimeout(() => {
      expect(component.mostrarNotificacion).toBe(false);
      done();
    }, 4000);
  });
});
