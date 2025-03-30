import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCuentasComponent } from './tabla-cuentas.component';

describe('TablaCuentasComponent', () => {
  let component: TablaCuentasComponent;
  let fixture: ComponentFixture<TablaCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaCuentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
