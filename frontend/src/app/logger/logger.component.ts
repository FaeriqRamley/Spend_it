import { Component, OnInit } from '@angular/core';
import IExpense from '../interfaces/expenseInterface';
import { ExpenseService } from '../services/expense.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  constructor(private expenseService:ExpenseService,private userService:UserService) { }
  title=''
  value=0
  date= new Date();
  time= new Date();
  outputDateTime = new Date()
  category=''
  is_income=false;
  errMsg = '';
  
  handleSubmitExpense(event:any){
    event.preventDefault()
    // create dateTime object
    this.outputDateTime.setTime(this.time.getTime());
    this.outputDateTime.setDate(this.date.getDate());
    this.outputDateTime.setMonth(this.date.getMonth());
    this.outputDateTime.setFullYear(this.date.getFullYear());
    event.submitter.value==="income" ? this.is_income=true : this.is_income=false;
    const newExpense:IExpense = {
      title:this.title,
      value:this.value,
      is_income: this.is_income,
      date: this.outputDateTime,
      category:this.category,
    }
    //validate object here
    this.expenseService.postExpense(newExpense)
    .subscribe(
      data=>{
        console.log('entry success');
      },
      err=>{
        if (err.status===401){
          console.log(err);
          this.errMsg = `${err.error.message}. Please refresh the page.`
        }
      }
    )
    console.log(newExpense);
  }
  
  ngOnInit(): void {
    console.log(this.date.getFullYear());
    console.log(this.time);
  }

}
