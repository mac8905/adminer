import { TestBed, inject } from '@angular/core/testing';

import { EntriesService } from './entries.service';

describe('EntriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntriesService]
    });
  });

  it('should ...', inject([EntriesService], (service: EntriesService) => {
    expect(service).toBeTruthy();
  }));
});
