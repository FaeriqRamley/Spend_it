import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import IExpense from '../../interfaces/expenseInterface';
import { ExpenseService } from '../../services/expense.service';
import { UserService } from '../../services/user.service';
import { WalletInfoService } from '../../services/wallet-info.service';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  constructor(private expenseService:ExpenseService,private userService:UserService,private walletInfoService:WalletInfoService,private budgetService:BudgetService) { }
  title=''
  value=0
  date= new Date();
  time= new Date();
  outputDateTime = new Date()
  category=''
  is_income=false;
  errMsg = '';
  
  validateSubmitExpense(input:IExpense){
    let outputMsg = '';
    if(input.title.length === 0){
      outputMsg += 'title cannot be empty '
    }
    if(input.value < 0){
      outputMsg += 'value cannot be negative'
    }

    return outputMsg;
  }

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
    this.errMsg = this.validateSubmitExpense(newExpense);

    if(this.errMsg === ''){
      this.expenseService.postExpense(newExpense)
      .subscribe(
        data=>{
          console.log('entry success');
          this.walletInfoService.getLatestUserWallet();
          this.budgetService.getLatestBudget();
          this.expenseService.getExpenses();
        },
        err=>{
          if (err.status===401){
            console.log(err);
            this.errMsg = `${err.error.message}. Please refresh the page.`
          }
        },
        ()=>{
          this.title = '';
          this.value = 0;
          this.category = '';
        }
      )
      console.log(newExpense);
    } else{
      console.log('not submitted');
    }
  }
  
  ngOnInit(): void {
  }

}
