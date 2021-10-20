import { Component, OnInit, Input } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { SavingGoalsService } from 'src/app/services/saving-goals.service';
import { WalletInfoService } from 'src/app/services/wallet-info.service';

@Component({
  selector: 'app-budget-create-modal',
  templateUrl: './budget-create-modal.component.html',
  styleUrls: ['./budget-create-modal.component.css']
})
export class BudgetCreateModalComponent implements OnInit {

  public errMsg:string = '';
  public title:string = '';
  public total:number = 0;
  public current:number = 0;
  public dateStart:Date = new Date();
  public dateEnd:Date = new Date();
  
  @Input() modalRef?:BsModalRef;

  constructor(private modalService:BsModalService,private savingGoalsService:SavingGoalsService, private walletInfoService:WalletInfoService) {
  }

  ngOnInit(): void {
    this.dateEnd.setDate(this.dateStart.getDate() + 30);
  }


}
