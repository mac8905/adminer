import { TestBed, inject } from '@angular/core/testing';

import { MaintenancesService } from './maintenances.service';

describe('MaintenancesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaintenancesService]
    });
  });

  it('should ...', inject([MaintenancesService], (service: MaintenancesService) => {
    expect(service).toBeTruthy();
  }));
});
