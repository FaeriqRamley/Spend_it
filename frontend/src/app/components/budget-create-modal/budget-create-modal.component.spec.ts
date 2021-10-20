import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCreateModalComponent } from './budget-create-modal.component';

describe('BudgetCreateModalComponent', () => {
  let component: BudgetCreateModalComponent;
  let fixture: ComponentFixture<BudgetCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetCreateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
