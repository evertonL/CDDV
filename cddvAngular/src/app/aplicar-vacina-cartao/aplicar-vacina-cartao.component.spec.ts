import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicarVacinaCartaoComponent } from './aplicar-vacina-cartao.component';

describe('AplicarVacinaCartaoComponent', () => {
  let component: AplicarVacinaCartaoComponent;
  let fixture: ComponentFixture<AplicarVacinaCartaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicarVacinaCartaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicarVacinaCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
