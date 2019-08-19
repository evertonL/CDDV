import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceAdsComponent } from './workspace-ads.component';

describe('WorkspaceAdsComponent', () => {
  let component: WorkspaceAdsComponent;
  let fixture: ComponentFixture<WorkspaceAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
