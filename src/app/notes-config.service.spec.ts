import { TestBed } from '@angular/core/testing';

import { NotesConfigService } from './notes-config.service';

describe('NotesConfigService', () => {
  let service: NotesConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
