import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import IUserCashFlow from '../interfaces/cashFlowInterface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {

  public userCashFlows:IUserCashFlow[] = [];
  public observableUserCashFlows:any;

  constructor(private http:HttpClient,private userService:UserService) {
    this.observableUserCashFlows = new BehaviorSubject(this.userCashFlows);
  }

  eventChange(){
    this.observableUserCashFlows.next(this.userCashFlows)
  }

  getLatestCashFlows(){
    this.http.get(`http://localhost:5000/cashFlow/getCashFlows/${this.userService.currentUser.uuid}`)
    .subscribe(
      (data:any)=>{
        console.log('getLatestCashFlows success');
        console.log(data);
        this.userCashFlows = [];
        for(const cashflow of data){
          this.userCashFlows.push({
            cashflowUUID: cashflow.uuid,
            value: parseFloat(cashflow.value),
            is_income: cashflow.is_income,
            title: cashflow.title,
            category: cashflow.category,
            next_payment_date: new Date(cashflow.next_payment_date),
            by_days: cashflow.by_days,
            period: cashflow.period
          })
        }
      },
      err=>{
        console.log('getLatestCashFlows error',err)
      },
      ()=>{
        console.log('getLatestCashFlows done');
        this.eventChange()
      }
    )
  }

  createCashFlow(input:IUserCashFlow){
    this.http.post(`http://localhost:5000/cashFlow/createCashFlow/${this.userService.currentUser.uuid}`,input)
    .subscribe(
      (data:any)=>{
        console.log('createCashFlow success');
        console.log(data);
      },
      err=>{
        console.log('createCashFlow error',err)
      },
      ()=>{
        console.log('createCashFlow done');
        this.getLatestCashFlows();
      }
    )
  }

  deleteCashFlow(cashflowUUID:any){
    this.http.delete(`http://localhost:5000/cashFlow/deleteCashFlow/${cashflowUUID}`)
    .subscribe(
      data=>{
        console.log('deleteCashFlow success');
      },
      err=>{
        console.log('deleteCashFlow error',err);
      },
      ()=>{
        console.log('deleteCashFlow done');
        this.getLatestCashFlows();
      }
    )
  }

}
