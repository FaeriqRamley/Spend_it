import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
import { WalletInfoService } from './services/wallet-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'spendit';

  public bgClass:string = 'background positive';
  private subscription:Subscription;
  constructor (private userService:UserService, private walletInfoService:WalletInfoService){
    this.subscription = this.walletInfoService.observableWallet;
  }

  ngOnInit():void {
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (refreshToken){
      console.log('refresh token detected. Checking expiry...');
      this.userService.userRefresh();
    } else {
      console.log("refresh token not detected");
    }

    const forAccessToken = setInterval(()=>{
      window.location.reload();
    },(1000*60*15));

    this.subscription = this.walletInfoService.observableWallet
    .subscribe(
      (item:any)=>{
        if(item.net_worth < 0){
          this.bgClass = 'background negative';
        } else {
          this.bgClass = 'background positive';
        }
      }
    )
  }
}