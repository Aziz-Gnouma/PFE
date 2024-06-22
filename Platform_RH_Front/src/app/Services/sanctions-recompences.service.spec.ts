import { TestBed } from '@angular/core/testing';

import { SanctionsRecompencesService } from './sanctions-recompences.service';

describe('SanctionsRecompencesService', () => {
  let service: SanctionsRecompencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanctionsRecompencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
