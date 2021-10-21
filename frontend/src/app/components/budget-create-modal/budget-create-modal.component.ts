import { Component, OnInit, Input } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { BudgetService } from 'src/app/services/budget.service';
import { SavingGoalsService } from 'src/app/services/saving-goals.service';
import { WalletInfoService } from 'src/app/services/wallet-info.service';
import IUserBudget from '../../interfaces/userBudgetInterface';

@Component({
  selector: 'app-budget-create-modal',
  templateUrl: './budget-create-modal.component.html',
  styleUrls: ['./budget-create-modal.component.css']
})
export class BudgetCreateModalComponent implements OnInit {

  public errMsg:string = '';
  public title:string = '';
  public total:number = 0;
  public today:Date = new Date();
  public dateStart:Date = new Date();
  public dateEnd:Date = new Date();
  
  @Input() modalRef?:BsModalRef;

  constructor(private modalService:BsModalService, private budgetService:BudgetService) {
  }


  validateBudgetSubmit(input:IUserBudget){
    let outputMsg = ''
    if(input.total <= 0){
      console.log('is less than 0')
      outputMsg += 'total must be at least $1 '
    }

    for(const existingBudget of this.budgetService.userBudget){
      if(existingBudget.title === input.title){
        outputMsg += 'a budget with the same name already exists'
        break;
      }
    }

    return outputMsg
  }

  onClickSubmitBudget(){
    this.dateStart.setHours(0);
    this.dateStart.setMinutes(0);
    this.dateEnd.setHours(23);
    this.dateEnd.setMinutes(59);
    const newEntry:IUserBudget = {
      title: this.title,
      total: this.total,
      current: this.total,
      date_start: this.dateStart,
      date_end: this.dateEnd
    }

    this.errMsg = this.validateBudgetSubmit(newEntry)
    if (this.errMsg === ''){
      this.budgetService.createBudget(newEntry);
    } else {
      console.log('no submit! error detected');
    }
  }

  ngOnInit(): void {
  }


}
