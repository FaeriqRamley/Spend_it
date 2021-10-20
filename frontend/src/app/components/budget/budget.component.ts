import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import IUserBudget from 'src/app/interfaces/userBudgetInterface';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  public subscription:Subscription;
  modalRef?:BsModalRef;

  public userBudgets:IUserBudget[] = [];

  constructor(private budgetService:BudgetService, private modalService:BsModalService) {
    this.subscription = this.budgetService.observableBudget;
  }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.subscription = this.budgetService.observableBudget
    .subscribe(
      (data:any)=>{
        console.log('budget change detected');
      },
      (err:any)=>{
        console.log(err);
      },
      ()=>{
        console.log('budget subscription done');
      }
    )
  }

}
