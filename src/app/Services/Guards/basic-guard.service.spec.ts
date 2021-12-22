import { TestBed } from '@angular/core/testing';

import { BasicGuardService } from './basic-guard.service';

describe('BasicGuardService', () => {
  let service: BasicGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
