import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { SavingGoalsService } from 'src/app/services/saving-goals.service';
@Component({
  selector: 'app-saving-goals',
  templateUrl: './saving-goals.component.html',
  styleUrls: ['./saving-goals.component.css']
})
export class SavingGoalsComponent implements OnInit {
  
  public subscription:Subscription;
  modalRef?:BsModalRef;

  public userSavings = [
    {
      uuid:'1234-5678-9112',
      title:'This Goal',
      target:700,
      current:87,
    },
    {
      uuid:'1234-5678-9113',
      title:'That Goal',
      target:1200,
      current:957,
    },
  ]

  constructor(private modalService:BsModalService,private savingGoalsService:SavingGoalsService) {
    this.subscription = this.savingGoalsService.observableUserSavings;
  }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.subscription = this.savingGoalsService.observableUserSavings
    .subscribe(
      (item:any)=>{
        this.userSavings = item;
    })
  }

}
