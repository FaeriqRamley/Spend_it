import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import IUserWallet from '../interfaces/userWallet';
import { WalletInfoService } from '../services/wallet-info.service';

@Component({
  selector: 'app-walletinfo-large',
  templateUrl: './walletinfo-large.component.html',
  styleUrls: ['../walletinfo-small/walletinfo-small.component.html']
})
export class WalletinfoLargeComponent implements OnInit {

  public walletInfo:IUserWallet = this.walletInfoService.userWallet
  private subscription:Subscription;
  public netWorthClass:string = 'negative-cash';
  constructor(private walletInfoService:WalletInfoService) {
    this.subscription = this.walletInfoService.observableWallet
  }
  
  ngOnInit(): void {
    this.subscription = this.walletInfoService.observableWallet
    .subscribe( (item:any)=>{
      console.log('networth',item.net_worth);
      if(item.net_worth > 0){
        console.log('this is true for',item.net_worth);
        this.netWorthClass = 'positive-cash';
      } else{
        this.netWorthClass = 'negative-cash';
      }

      this.walletInfo = item
    })
  }

}
