import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Subscription } from 'rxjs';
import IExpense from 'src/app/interfaces/expenseInterface';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  
  public total:number = 0;
  public searchStr:string = '';
  public searchParam:string = 'Title';
  public userExpenses:IExpense[] = [];
  public displayExpenses:IExpense[] = [];
  private subscription:Subscription;
  constructor(private expenseService:ExpenseService) {
    this.subscription = this.expenseService.observableUserExpenses;
  }

  onClickChangeParam(event:any){
    this.searchParam = event.target.value;
  }

  onChangeDo(event:string){
    console.log(event);
    if(this.searchParam === 'Title'){
      this.displayExpenses = this.userExpenses.filter(expense => expense.title.toUpperCase().includes(event.toUpperCase()));
    } else {
      this.displayExpenses = this.userExpenses.filter(expense => expense.category.toUpperCase().includes(event.toUpperCase()))
    }
    this.total = 0;
    for(const expense of this.displayExpenses){
      if(expense.is_income){
        this.total += expense.value
      } else{
        this.total -= expense.value
      }
    }
    console.log(this.total);
  }

  ngOnInit(): void {
    this.subscription = this.expenseService.observableUserExpenses
    .subscribe(
      (data:any)=>{
        console.log('expenses change detected');
        this.userExpenses = data;
        this.displayExpenses = this.userExpenses;
        this.total=0;
        for (const expense of data){
          if(expense.is_income){
            this.total += expense.value
          } else{
            this.total -= expense.value
          }
        }
      }
    )
  }

}
