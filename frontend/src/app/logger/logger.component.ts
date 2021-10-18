import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  constructor() { }
  title=''
  value=0
  date= new Date();
  time= new Date();
  outputDateTime = new Date()
  category=''
  is_income=false;
  
  handleSubmitExpense(event:any){
    event.preventDefault()
    // create dateTime object
    this.outputDateTime.setTime(this.time.getTime());
    this.outputDateTime.setDate(this.date.getDate());
    this.outputDateTime.setMonth(this.date.getMonth());
    this.outputDateTime.setFullYear(this.date.getFullYear());
    event.submitter.value==="income" ? this.is_income=true : this.is_income=false;
    const newExpense:Object = {
      title:this.title,
      value:this.value,
      is_income: this.is_income,
      date: this.outputDateTime,
      category:this.category,
    }
    //validate object here
    //post request here
    console.log(newExpense);
  }
  
  ngOnInit(): void {
    console.log(this.date.getFullYear());
    console.log(this.time);
  }

}
