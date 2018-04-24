import { TestBed, inject } from '@angular/core/testing';

import { DateHandelrService } from './date-handelr.service';

describe('DateHandelrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateHandelrService]
    });
  });

  it('should be created', inject([DateHandelrService], (service: DateHandelrService) => {
    expect(service).toBeTruthy();
  }));
});
