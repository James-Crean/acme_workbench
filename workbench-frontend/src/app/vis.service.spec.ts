import { TestBed, inject } from '@angular/core/testing';

import { VisService } from './vis.service';

describe('VisServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisService]
    });
  });

  it('should be created', inject([VisService], (service: VisService) => {
    expect(service).toBeTruthy();
  }));
});
