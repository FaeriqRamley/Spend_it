import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletinfoLargeComponent } from './walletinfo-large.component';

describe('WalletinfoLargeComponent', () => {
  let component: WalletinfoLargeComponent;
  let fixture: ComponentFixture<WalletinfoLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletinfoLargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletinfoLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
