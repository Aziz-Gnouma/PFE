import { TestBed } from '@angular/core/testing';

import { DocumentAuthService } from './document-auth.service';

describe('DocumentAuthService', () => {
  let service: DocumentAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
