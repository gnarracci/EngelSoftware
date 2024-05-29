import { TestBed } from '@angular/core/testing';

import { DescripTempService } from './descrip-temp.service';

describe('DescripTempService', () => {
  let service: DescripTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescripTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
