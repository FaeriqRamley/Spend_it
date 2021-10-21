import { Component, OnInit,TemplateRef } from '@angular/core';
import IUserCashFlow from 'src/app/interfaces/cashFlowInterface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { CashFlowService } from 'src/app/services/cash-flow.service';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  public cashFlows:IUserCashFlow[] = []

  public modalRef?:BsModalRef;

  public subscription:Subscription;

  constructor(private modalService:BsModalService, private cashFlowService:CashFlowService) {
    this.subscription = this.cashFlowService.observableUserCashFlows;
  }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  ngOnInit(): void {
    this.subscription = this.cashFlowService.observableUserCashFlows
    .subscribe(
      (item:any)=>{
        this.cashFlows = item;
      }
    )
  }

}
