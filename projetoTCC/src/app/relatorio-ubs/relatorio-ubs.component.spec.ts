import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioUbsComponent } from './relatorio-ubs.component';

describe('RelatorioUbsComponent', () => {
  let component: RelatorioUbsComponent;
  let fixture: ComponentFixture<RelatorioUbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioUbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioUbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
