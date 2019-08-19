import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUbsComponent } from './login-ubs.component';

describe('LoginUbsComponent', () => {
  let component: LoginUbsComponent;
  let fixture: ComponentFixture<LoginUbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
