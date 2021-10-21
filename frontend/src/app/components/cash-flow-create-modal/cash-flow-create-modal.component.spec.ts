import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowCreateModalComponent } from './cash-flow-create-modal.component';

describe('CashFlowCreateModalComponent', () => {
  let component: CashFlowCreateModalComponent;
  let fixture: ComponentFixture<CashFlowCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowCreateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
