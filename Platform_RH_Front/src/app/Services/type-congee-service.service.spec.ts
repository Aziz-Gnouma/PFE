import { TestBed } from '@angular/core/testing';

import { TypeCongeeServiceService } from './type-congee-service.service';

describe('TypeCongeeServiceService', () => {
  let service: TypeCongeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCongeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
