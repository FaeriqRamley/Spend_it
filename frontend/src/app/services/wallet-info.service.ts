import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import IUserWallet from '../interfaces/userWallet';

@Injectable({
  providedIn: 'root'
})
export class WalletInfoService {
  constructor(private http:HttpClient,private userService:UserService){
    this.observableWallet = new BehaviorSubject(this.userWallet);
  }

  public userWallet:IUserWallet = {
    actual_income:0,
    current_budget:0,
    net_worth:0,
    disposable_income:0,
  }

  
  public observableWallet:any;

  eventChange(){
    this.observableWallet.next(this.userWallet);
  }

  getLatestUserWallet(){
    console.log('current Access Token:',this.userService.currentUser.uuid);
    this.http.put(`http://localhost:5000/calculatedInfo/update/${this.userService.currentUser.uuid}`,{})
    .subscribe(
      (data:any)=>{
        console.log('update success');
        console.log(data);
        const {actual_income,current_budget,disposable_income,net_worth} = data
        this.userWallet = {
          actual_income,
          current_budget,
          disposable_income,
          net_worth
        };
        this.eventChange();
      },
      err=>{
        console.log(err);
      },
      ()=>{
        console.log('userWallet',this.userWallet)
      }
    )
  }
}
