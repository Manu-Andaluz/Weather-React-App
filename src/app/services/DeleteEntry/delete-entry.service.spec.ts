import { TestBed } from '@angular/core/testing';

import { DeleteEntryService } from './delete-entry.service';

describe('DeleteEntryService', () => {
  let service: DeleteEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
