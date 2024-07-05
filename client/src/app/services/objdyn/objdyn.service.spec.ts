import { TestBed } from '@angular/core/testing';

import { ObjdynService } from './objdyn.service';

describe('ObjdynService', () => {
  let service: ObjdynService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjdynService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
