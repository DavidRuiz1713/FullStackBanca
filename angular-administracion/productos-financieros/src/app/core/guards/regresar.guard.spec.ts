import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { regresarGuard } from './regresar.guard';

describe('regresarGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => regresarGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
