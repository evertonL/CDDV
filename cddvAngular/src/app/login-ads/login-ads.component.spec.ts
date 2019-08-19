import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdsComponent } from './login-ads.component';

describe('LoginAdsComponent', () => {
  let component: LoginAdsComponent;
  let fixture: ComponentFixture<LoginAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
