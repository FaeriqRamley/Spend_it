import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-saving-goals',
  templateUrl: './saving-goals.component.html',
  styleUrls: ['./saving-goals.component.css']
})
export class SavingGoalsComponent implements OnInit {
  
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

  constructor(private modalService:BsModalService) { }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}
