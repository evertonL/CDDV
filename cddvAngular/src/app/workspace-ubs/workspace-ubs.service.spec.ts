import { TestBed } from '@angular/core/testing';

import { WorkspaceUbsService } from './workspace-ubs.service';

describe('WorkspaceUbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkspaceUbsService = TestBed.get(WorkspaceUbsService);
    expect(service).toBeTruthy();
  });
});
