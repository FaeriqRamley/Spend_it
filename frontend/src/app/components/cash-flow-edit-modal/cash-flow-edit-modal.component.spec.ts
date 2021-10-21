import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowEditModalComponent } from './cash-flow-edit-modal.component';

describe('CashFlowEditModalComponent', () => {
  let component: CashFlowEditModalComponent;
  let fixture: ComponentFixture<CashFlowEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
