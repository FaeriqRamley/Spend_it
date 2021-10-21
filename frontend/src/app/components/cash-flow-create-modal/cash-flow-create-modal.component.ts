import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import IUserCashFlow from 'src/app/interfaces/cashFlowInterface';
import { CashFlowService } from 'src/app/services/cash-flow.service';

@Component({
  selector: 'app-cash-flow-create-modal',
  templateUrl: './cash-flow-create-modal.component.html',
  styleUrls: ['./cash-flow-create-modal.component.css']
})
export class CashFlowCreateModalComponent implements OnInit {
  
  @Input() modalRef?:BsModalRef
  public errMsg:string = '';
  public value:number = 0;
  public is_income:boolean = true;
  public title:string = '';
  public category:string = '';
  public next_payment_date:Date = new Date();
  public by_days:boolean = false;
  public period:number = 1;
  
  constructor(private cashFlowService:CashFlowService) { }

  validateCashFlow(input:IUserCashFlow){
    let outputMsg = ''

    if(this.value < 0){
      outputMsg += 'Value cannot be less than 0 '
    }

    if(this.period < 1){
      outputMsg += 'Payment interval cannot be less than one day'
    }

    return outputMsg

  }

  onClickSubmitCashflow(){
    this.next_payment_date.setHours(0);
    this.next_payment_date.setMinutes(0);
    if(!this.by_days){
      this.period = 1;
    }
    const newEntry:IUserCashFlow = {
      title: this.title,
      value: this.value,
      is_income: this.is_income,
      category: this.category,
      next_payment_date: this.next_payment_date,
      by_days: this.by_days,
      period: this.period
    }
    console.log(newEntry);
    this.errMsg = this.validateCashFlow(newEntry);

    if(this.errMsg===''){
      console.log('entry validated, submit');
      this.cashFlowService.createCashFlow(newEntry);
      this.modalRef?.hide();
    } else{
      console.log('entry not validated, dont submit');
    }
  }

  ngOnInit(): void {
  }

}
