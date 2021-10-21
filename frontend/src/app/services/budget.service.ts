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
        this.userBudget = data;
      },
      err=>{
        console.log('getLatestBudget Error:',err);
      },
      ()=>{
        console.log('get latest budget done');
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
        this.eventChange();
      }
    )
  }



}