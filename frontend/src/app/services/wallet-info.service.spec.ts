import { TestBed } from '@angular/core/testing';

import { WalletInfoService } from './wallet-info.service';

describe('WalletInfoService', () => {
  let service: WalletInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
