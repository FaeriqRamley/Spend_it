import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { SavingGoalsService } from 'src/app/services/saving-goals.service';
import { WalletInfoService } from 'src/app/services/wallet-info.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent implements OnInit {

  public errMsg:string = '';
  public title:string = '';
  public value:number = 1;
  @Input() modalRef?:BsModalRef;
  

  constructor(private modalService:BsModalService,private savingGoalsService:SavingGoalsService, private walletInfoService:WalletInfoService) {
  }

  validateSavings(input:any){
    const currentSavings = this.savingGoalsService.userSavings;
    let outputMsg = ''
    if(input.title === ''){
      outputMsg += 'please input something for the title'
    }
    for(const saving of currentSavings){
      if(input.title === saving.title){
        outputMsg += ' saving with the same title already exists'
      }
    }
    if(input.target<1){
      outputMsg += ' value must be at least $1'
    }

    return outputMsg

  }

  onClickSubmit(event:any){
    event.preventDefault();
    console.log('clicked');
    const newEntry = {
      title: this.title,
      target: this.value
    }
    this.errMsg = this.validateSavings(newEntry);

    if (this.errMsg !== ""){
      this.title = "";
      this.value = 1;
    } else {
      this.savingGoalsService.createUserSavings(newEntry);
      this.modalRef?.hide();
    }

  }


  ngOnInit(): void {
  }


}
