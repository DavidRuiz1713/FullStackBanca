import { ComponentFixture, TestBed } from '@angular/core/testing';
import AgregarProductosComponent from './agregar-productos.component';
import { HttpClientModule } from '@angular/common/http';

describe('AgregarProductosComponent', () => {
  let component: AgregarProductosComponent;
  let fixture: ComponentFixture<AgregarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarProductosComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
