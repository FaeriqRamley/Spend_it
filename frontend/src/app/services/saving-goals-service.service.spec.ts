import { TestBed } from '@angular/core/testing';

import { SavingGoalsServiceService } from './saving-goals-service.service';

describe('SavingGoalsServiceService', () => {
  let service: SavingGoalsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingGoalsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
