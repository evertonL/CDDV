import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoPopulacaoComponent } from './cartao-populacao.component';

describe('CartaoPopulacaoComponent', () => {
  let component: CartaoPopulacaoComponent;
  let fixture: ComponentFixture<CartaoPopulacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoPopulacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoPopulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
