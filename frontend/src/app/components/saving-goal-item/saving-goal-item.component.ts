import { Component, OnInit, Input } from '@angular/core';

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

  public showButtons:boolean = false;

  constructor() { }

  onClickShowButtons(){
    this.showButtons = !this.showButtons;
  }
  
  ngOnInit(): void {
    console.log('saving goal current val:',this.currentVal, typeof this.currentVal);
  }

}
