import { TestBed, inject } from '@angular/core/testing';

import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilesService]
    });
  });

  it('should ...', inject([ProfilesService], (service: ProfilesService) => {
    expect(service).toBeTruthy();
  }));
});
