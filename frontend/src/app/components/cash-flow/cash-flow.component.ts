import { Component, OnInit,TemplateRef } from '@angular/core';
import IUserCashFlow from 'src/app/interfaces/cashFlowInterface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  public cashFlows:IUserCashFlow[] = []

  public modalRef?:BsModalRef;

 
  constructor(private modalService:BsModalService) { }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  ngOnInit(): void {
  }

}
