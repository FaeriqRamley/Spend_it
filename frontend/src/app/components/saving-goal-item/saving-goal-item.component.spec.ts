import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingGoalItemComponent } from './saving-goal-item.component';

describe('SavingGoalItemComponent', () => {
  let component: SavingGoalItemComponent;
  let fixture: ComponentFixture<SavingGoalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingGoalItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingGoalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
