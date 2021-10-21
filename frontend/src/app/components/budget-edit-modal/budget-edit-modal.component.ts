import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import IUserBudget from 'src/app/interfaces/userBudgetInterface';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget-edit-modal',
  templateUrl: './budget-edit-modal.component.html',
  styleUrls: ['./budget-edit-modal.component.css']
})
export class BudgetEditModalComponent implements OnInit {

  @Input() modalRef?:BsModalRef;
  @Input() title:string = 'Unknown Saving';
  @Input() currentVal:number = 999;
  @Input() budgetUUID:any = "";
  @Input() totalVal:number = 0;
  @Input() date_start:Date = new Date();
  @Input() date_end:Date = new Date();
  
  constructor(private budgetService:BudgetService) { }
  
  public errMsg:string = '';
  public today:Date = new Date();
  public currTitle:string = '';

  validateBudgetUpdate(input:IUserBudget){
    let outputMsg = ''
    if(input.total <= 0){
      console.log('is less than 0')
      outputMsg += 'total must be at least $1 '
    }
    
    console.log('currTitle here:',this.currTitle)
    for(const budget of this.budgetService.userBudget){
      if(budget.title === input.title && budget.title !== this.currTitle){
        console.log('duplicate exists');
        outputMsg += 'budget with the same name already exists';
        break;
      }
    }

    return outputMsg
  }

  onClickUpdateBudget(){
    const updatedEntry:IUserBudget = {
      title:this.title,
      total:this.totalVal,
      current:this.currentVal,
      date_start:this.date_start,
      date_end:this.date_end,
    }
    console.log(updatedEntry);
    this.errMsg = this.validateBudgetUpdate(updatedEntry);
    
    if (this.errMsg === ''){
      console.log('sending update');
      this.budgetService.updateBudget(this.budgetUUID,updatedEntry);
      this.modalRef?.hide();
    } else {
      console.log('not sending update');
    }
  }

  ngOnInit(): void {
    this.currTitle = this.title;
  }

}
