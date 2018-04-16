import { TestBed, inject } from '@angular/core/testing';

import { NpstopService } from './npstop.service';

describe('NpstopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NpstopService]
    });
  });

  it('should be created', inject([NpstopService], (service: NpstopService) => {
    expect(service).toBeTruthy();
  }));
});
