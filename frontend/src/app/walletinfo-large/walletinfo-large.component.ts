import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import IUserWallet from '../interfaces/userWallet';
import { WalletInfoService } from '../services/wallet-info.service';

@Component({
  selector: 'app-walletinfo-large',
  templateUrl: './walletinfo-large.component.html',
  styleUrls: ['./walletinfo-large.component.css']
})
export class WalletinfoLargeComponent implements OnInit {

  public walletInfo:IUserWallet = this.walletInfoService.userWallet
  private subscription:Subscription;
  public netWorthClass:string = 'negative-cash';
  public budgetClass:string = 'negative-cash';
  public incomeClass:string = 'negative-cash';
  
  constructor(private walletInfoService:WalletInfoService) {
    this.subscription = this.walletInfoService.observableWallet
  }
  
  ngOnInit(): void {
    this.subscription = this.walletInfoService.observableWallet
    .subscribe( (item:any)=>{
      console.log(item);
      console.log('networth',item.net_worth);
      if(item.net_worth > 0){
        console.log('this is true for',item.net_worth);
        this.netWorthClass = 'positive-cash';
      } else{
        this.netWorthClass = 'negative-cash';
      }

      if(item.disposable_income > 0){
        console.log('this is true for',item.net_worth);
        this.incomeClass = 'positive-cash';
      } else{
        this.incomeClass = 'negative-cash';
      }

      if(item.current_budget > 0){
        console.log('this is true for',item.net_worth);
        this.budgetClass = 'positive-cash';
      } else{
        this.budgetClass = 'negative-cash';
      }

      this.walletInfo = item
    })
  }

}
