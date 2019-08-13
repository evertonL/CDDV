import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPopulacaoComponent } from './cadastrar-populacao.component';

describe('CadastrarPopulacaoComponent', () => {
  let component: CadastrarPopulacaoComponent;
  let fixture: ComponentFixture<CadastrarPopulacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPopulacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPopulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
