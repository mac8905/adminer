import { TestBed, inject } from '@angular/core/testing';

import { StocksService } from './stocks.service';

describe('StocksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocksService]
    });
  });

  it('should ...', inject([StocksService], (service: StocksService) => {
    expect(service).toBeTruthy();
  }));
});
