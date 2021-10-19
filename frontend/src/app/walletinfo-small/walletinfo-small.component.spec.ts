import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletinfoSmallComponent } from './walletinfo-small.component';

describe('WalletinfoSmallComponent', () => {
  let component: WalletinfoSmallComponent;
  let fixture: ComponentFixture<WalletinfoSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletinfoSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletinfoSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
