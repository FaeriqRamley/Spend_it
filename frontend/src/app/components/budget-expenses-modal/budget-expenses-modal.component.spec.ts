import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpensesModalComponent } from './budget-expenses-modal.component';

describe('BudgetExpensesModalComponent', () => {
  let component: BudgetExpensesModalComponent;
  let fixture: ComponentFixture<BudgetExpensesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetExpensesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetExpensesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
