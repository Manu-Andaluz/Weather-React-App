import { TestBed } from '@angular/core/testing';

import { EntryDetailsService } from './entry-details.service';

describe('EntryDetailsService', () => {
  let service: EntryDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
