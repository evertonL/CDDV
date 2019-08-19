import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAdsComponent } from './cadastrar-ads.component';

describe('CadastrarAdsComponent', () => {
  let component: CadastrarAdsComponent;
  let fixture: ComponentFixture<CadastrarAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
