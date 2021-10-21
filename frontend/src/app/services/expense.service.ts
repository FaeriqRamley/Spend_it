import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import IExpense from '../interfaces/expenseInterface';
import { UserService } from './user.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  public userExpenses:IExpense[] = [];
  public observableUserExpenses:any;
  constructor(private http:HttpClient,private userService:UserService) {
    this.observableUserExpenses = new BehaviorSubject(this.userExpenses)
  }

  changeEvent(){
    this.observableUserExpenses.next(this.userExpenses);
  }

  postExpense(expense:IExpense){
    return this.http.post(`http://localhost:5000/expense/log/${this.userService.currentUser.uuid}`,expense);
  }

  getExpenses(){
    this.http.get(`http://localhost:5000/expense/viewUser/${this.userService.currentUser.uuid}`)
    .subscribe(
      (data:any)=>{
        console.log('getExpense success');
        console.log(data)
        this.userExpenses = [];
        for (const expense of data){
          this.userExpenses.push({
            title: expense.title,
            value: parseInt(expense.value),
            date: new Date(expense.date),
            is_income: expense.is_income,
            category: expense.category
          })
        }
      },
      err=>{
        console.log('getExpense error',err);
      },
      ()=>{
        console.log('getExpenses done');
        this.changeEvent();
      }
    )
  }
}
