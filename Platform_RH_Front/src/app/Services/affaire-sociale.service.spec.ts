import { TestBed } from '@angular/core/testing';

import { AffaireSocialeService } from './affaire-sociale.service';

describe('AffaireSocialeService', () => {
  let service: AffaireSocialeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffaireSocialeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
