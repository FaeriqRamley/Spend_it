import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { BudgetService } from 'src/app/services/budget.service';
import { WalletInfoService } from 'src/app/services/wallet-info.service';

@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html',
  styleUrls: ['./budget-item.component.css']
})
export class BudgetItemComponent implements OnInit {

  @Input() title:string = 'Unknown Saving';
  @Input() currentVal:number = 70;
  @Input() budgetUUID:any = "";
  @Input() totalVal:number = 200;
  @Input() date_start:Date = new Date();
  @Input() date_end:Date = new Date();

  modalRef?:BsModalRef;

  public showButtons:boolean = false;
  public updateValue:number = 0;
  public updateErrMsg: string = '';

  constructor(private modalService:BsModalService, private walletInfoService:WalletInfoService, private budgetService:BudgetService) {}

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  onClickShowButtons(){
    this.showButtons = !this.showButtons;
  }


  onClickSubmitUpdateValue(event:any){
  }

  onClickDeleteBudget(){
    this.budgetService.deleteBudget(this.budgetUUID);
  }
  
  ngOnInit(): void {
    console.log('here are the budget dates...');
    console.log(this.date_end);
    console.log(this.date_start);
  }

}
