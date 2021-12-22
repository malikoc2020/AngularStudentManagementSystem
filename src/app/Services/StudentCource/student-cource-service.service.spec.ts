import { TestBed } from '@angular/core/testing';

import { StudentCourceServiceService } from './student-cource-service.service';

describe('StudentCourceServiceService', () => {
  let service: StudentCourceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCourceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
