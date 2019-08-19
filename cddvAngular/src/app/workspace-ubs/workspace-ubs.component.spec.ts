import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceUbsComponent } from './workspace-ubs.component';

describe('WorkspaceUbsComponent', () => {
  let component: WorkspaceUbsComponent;
  let fixture: ComponentFixture<WorkspaceUbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceUbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceUbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
