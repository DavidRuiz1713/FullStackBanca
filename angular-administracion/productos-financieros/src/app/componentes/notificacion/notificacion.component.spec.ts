import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacionComponent } from './notificacion.component';

describe('NotificacionComponent', () => {
  let component: NotificacionComponent;
  let fixture: ComponentFixture<NotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionComponent], // Importa el componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Mustra la notificacion cuando hay un cambio en los datos', () => {
    component.texto = 'Notificación de prueba';
    fixture.detectChanges();

    component.ngOnChanges({
      texto: {
        currentValue: component.texto,
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    fixture.detectChanges();

    expect(component.mostrarNotificacion).toBe(true);
    expect(component.ocultarNotificacion).toBe(false);
  });

  it('Esconde la notificacion si el tipo no es error', (done) => {
    component.texto = 'Notificación de prueba';
    component.tipo = 'success';
    fixture.detectChanges();

    component.ngOnChanges({
      texto: {
        currentValue: component.texto,
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    fixture.detectChanges();

    expect(component.mostrarNotificacion).toBe(true);
    expect(component.ocultarNotificacion).toBe(false);

    setTimeout(() => {
      expect(component.ocultarNotificacion).toBe(true);
      done();
    }, 3000);

    setTimeout(() => {
      expect(component.mostrarNotificacion).toBe(true);
      done();
    }, 4000);
  });

  it('Prueba que indica que no se esconde la notificacion si el tipo es igual a error', () => {
    component.texto = 'Notificación de error';
    component.tipo = 'error';
    fixture.detectChanges();

    component.ngOnChanges({
      texto: {
        currentValue: component.texto,
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    fixture.detectChanges();

    expect(component.mostrarNotificacion).toBe(true);

    jest.useFakeTimers();
    jest.advanceTimersByTime(5000);

    expect(component.ocultarNotificacion).toBe(false);
    expect(component.mostrarNotificacion).toBe(true);

    jest.useRealTimers();
  });
});
