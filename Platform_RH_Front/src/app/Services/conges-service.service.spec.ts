import { TestBed } from '@angular/core/testing';

import { CongesService } from './conges-service.service';

describe('CongesServiceService', () => {
  let service: CongesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
