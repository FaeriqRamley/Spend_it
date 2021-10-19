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

  constructor(private http:HttpClient,private userService:UserService) { }

  postExpense(expense:IExpense){
    return this.http.post(`http://localhost:5000/expense/log/${this.userService.currentUser.uuid}`,expense);
  }
}
