import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-budget-edit-modal',
  templateUrl: './budget-edit-modal.component.html',
  styleUrls: ['./budget-edit-modal.component.css']
})
export class BudgetEditModalComponent implements OnInit {

  @Input() modalRef?:BsModalRef;
  public errMsg:string = '';
  public today:Date = new Date();
  @Input() title:string = 'Unknown Saving';
  @Input() currentVal:number = 999;
  @Input() budgetUUID:any = "";
  @Input() totalVal:number = 0;
  @Input() date_start:Date = new Date();
  @Input() date_end:Date = new Date();

  constructor() { }

  onClickUpdateBudget(){
    console.log('sending update');
  }

  ngOnInit(): void {
  }

}
