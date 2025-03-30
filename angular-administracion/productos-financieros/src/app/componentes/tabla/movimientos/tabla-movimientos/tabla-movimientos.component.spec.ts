import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMovimientosComponent } from './tabla-movimientos.component';

describe('TablaMovimientosComponent', () => {
  let component: TablaMovimientosComponent;
  let fixture: ComponentFixture<TablaMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaMovimientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
