import { TestBed } from '@angular/core/testing';

import { DescripobjService } from './descripobj.service';

describe('DescripobjService', () => {
  let service: DescripobjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescripobjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
