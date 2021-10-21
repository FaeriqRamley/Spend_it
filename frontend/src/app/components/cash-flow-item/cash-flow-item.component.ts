import { Component, OnInit, Input } from '@angular/core';
import { CashFlowService } from 'src/app/services/cash-flow.service';

@Component({
  selector: 'app-cash-flow-item',
  templateUrl: './cash-flow-item.component.html',
  styleUrls: ['./cash-flow-item.component.css']
})
export class CashFlowItemComponent implements OnInit {

  @Input() cashflowUUID:any = ''
  @Input() value:number = 0
  @Input() is_income:boolean = false;
  @Input() title:string = 'Unknown Title'
  @Input() category:string = 'No Category'
  @Input() next_payment_date:Date = new Date();
  @Input() by_days:boolean = false
  @Input() period:number = 1

  public showMoreInfo:boolean = false;
  public cashflowClass = this.is_income ? 'card-title income':'card-title expense';
  
  constructor(private cashFlowService:CashFlowService) { }

  onClickShowMoreInfo(){
    this.showMoreInfo = !this.showMoreInfo;
  }

  onClickDeleteCashFlow(){
    this.cashFlowService.deleteCashFlow(this.cashflowUUID);
  }

  ngOnInit(): void {

  }

}
