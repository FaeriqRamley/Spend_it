import { Component, OnInit, Input,TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { SavingGoalsService } from 'src/app/services/saving-goals.service';
import { WalletInfoService } from 'src/app/services/wallet-info.service';

@Component({
  selector: 'app-saving-goal-item',
  templateUrl: './saving-goal-item.component.html',
  styleUrls: ['./saving-goal-item.component.css']
})
export class SavingGoalItemComponent implements OnInit {

  @Input() title:string = 'Unknown Saving';
  @Input() currentVal:number = 70;
  @Input() targetVal:number = 100;
  @Input() savingUUID:string = "";

  modalRef?:BsModalRef;

  public showButtons:boolean = false;
  public clickedUpdateType:string = '';
  public updateValue:number = 0;
  public updateErrMsg: string = '';

  constructor(private modalService:BsModalService, private walletInfoService:WalletInfoService, private savingGoalsService:SavingGoalsService) {}

  openModal(event:any,template:TemplateRef<any>){
    this.clickedUpdateType = event.target.value;
    this.modalRef = this.modalService.show(template);
  }

  onClickShowButtons(){
    this.showButtons = !this.showButtons;
  }


  onClickSubmitUpdateValue(event:any){
    this.updateErrMsg = '';
    console.log(this.updateValue);
    console.log(this.clickedUpdateType);
    //validation
    if(this.updateValue < 0){
      this.updateErrMsg += 'update value cannot be less than 0'
    }

    if(this.clickedUpdateType === "Withdraw"){
      if (this.updateValue > this.currentVal){
        this.updateErrMsg += ' you cannot withdraw more than the savings values'
      }
    } else {
      if (this.updateValue > this.walletInfoService.userWallet.actual_income){
        this.updateErrMsg += ' you cannot deposit more than your actual income value'
      }
    }

    if(this.updateErrMsg === ""){
      const newVal = this.updateValue + 0
      this.savingGoalsService.updateSavingsValue(newVal,this.clickedUpdateType,this.savingUUID)
      this.updateValue=0;
    } else{
      console.log('dont submit update value');
      this.updateValue=0;
    }

    event.preventDefault();
  }
  
  ngOnInit(): void {
  }

}
