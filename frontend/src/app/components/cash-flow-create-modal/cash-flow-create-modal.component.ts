import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cash-flow-create-modal',
  templateUrl: './cash-flow-create-modal.component.html',
  styleUrls: ['./cash-flow-create-modal.component.css']
})
export class CashFlowCreateModalComponent implements OnInit {
  
  @Input() modalRef?:BsModalRef
  
  constructor() { }

  ngOnInit(): void {
  }

}
