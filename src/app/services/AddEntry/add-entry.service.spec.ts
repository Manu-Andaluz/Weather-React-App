import { TestBed } from '@angular/core/testing';

import { AddEntryService } from './add-entry.service';

describe('AddEntryService', () => {
  let service: AddEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
