import { TestBed } from '@angular/core/testing';

import { PollutionsService } from './pollutions.service';

describe('PollutionsService', () => {
  let service: PollutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
