import { TestBed } from '@angular/core/testing';

import { CreategameService } from './creategame.service';

describe('CreategameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreategameService = TestBed.get(CreategameService);
    expect(service).toBeTruthy();
  });
});
