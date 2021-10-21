import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import IUserBudget from '../interfaces/userBudgetInterface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class BudgetService {
  
  public userBudget:IUserBudget[] = [];
  public observableBudget:any;

  constructor(private http:HttpClient,private userService:UserService) {
    this.observableBudget = new BehaviorSubject(this.userBudget);
  }

  eventChange(){
    this.observableBudget.next(this.userBudget);
  }

  getLatestBudget(){
    this.http.get(`http://localhost:5000/budget/getUserBudget/${this.userService.currentUser.uuid}`)
    .subscribe(
      (data:any)=>{
        this.userBudget = [];
        for (const budget of data){
          this.userBudget.push({
            budgetUUID: budget.uuid,
            title: budget.title,
            total: budget.total,
            current: budget.current,
            date_start: new Date(budget.date_start),
            date_end: new Date(budget.date_end)
          })
        };
      },
      err=>{
        console.log('getLatestBudget Error:',err);
      },
      ()=>{
        console.log('get latest budget done');
        console.log(this.userBudget);
        this.eventChange();
      }
    )
  }

  createBudget(input:IUserBudget){
    this.http.post(`http://localhost:5000/budget/createUserBudget/${this.userService.currentUser.uuid}`,input)
    .subscribe(
      data=>{
        console.log('create budget success',data);
      },
      err=>{
        console.log('createBudget Error:',err);
      },
      ()=>{
        console.log('create budget done');
        this.getLatestBudget();
      }
    )
  }



}