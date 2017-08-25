import { TestBed, inject } from '@angular/core/testing';

import { VisServiceService } from './vis-service.service';

describe('VisServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisServiceService]
    });
  });

  it('should be created', inject([VisServiceService], (service: VisServiceService) => {
    expect(service).toBeTruthy();
  }));
});
