import { TestBed } from '@angular/core/testing';

import { AplicarVacinaService } from './aplicar-vacina.service';

describe('AplicarVacinaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AplicarVacinaService = TestBed.get(AplicarVacinaService);
    expect(service).toBeTruthy();
  });
});
