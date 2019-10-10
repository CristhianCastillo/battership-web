import { TestBed } from '@angular/core/testing';

import { CreatebattlefieldService } from './createbattlefield.service';

describe('CreatebattlefieldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatebattlefieldService = TestBed.get(CreatebattlefieldService);
    expect(service).toBeTruthy();
  });
});
