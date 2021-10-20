import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-saving-goals',
  templateUrl: './saving-goals.component.html',
  styleUrls: ['./saving-goals.component.css']
})
export class SavingGoalsComponent implements OnInit {
  
  modalRef?:BsModalRef;

  constructor(private modalService:BsModalService) { }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}
