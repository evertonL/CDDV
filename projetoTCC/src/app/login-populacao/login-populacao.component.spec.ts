import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopulacaoComponent } from './login-populacao.component';

describe('LoginPopulacaoComponent', () => {
  let component: LoginPopulacaoComponent;
  let fixture: ComponentFixture<LoginPopulacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPopulacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPopulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
