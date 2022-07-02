import { TestBed } from '@angular/core/testing';

import { contactDataService } from './contact-data.service';

describe('TodoDataService', () => {
  let service: contactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(contactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
