import { TestBed } from '@angular/core/testing';

import { VerifyRoleService } from './verify-role.service';

describe('VerifyRoleService', () => {
  let service: VerifyRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
