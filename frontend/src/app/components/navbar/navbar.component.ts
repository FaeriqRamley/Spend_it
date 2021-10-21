import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { WalletInfoService } from 'src/app/services/wallet-info.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public username='';
  public isLoggedIn=false;
  public clsNavLink = 'nav-link';
  public navClass='navbar sticky-top navbar-expand-lg navbar-light bg-success';
  private subscription: Subscription;
  private subscription2: Subscription;
  constructor(
    private userService:UserService,
    private walletInfoService:WalletInfoService
  ) {
    this.subscription = this.userService.observableUser
    this.subscription2 = this.walletInfoService.observableWallet
  }

  handleLogout(event:any){
    this.userService.logoutUser();
  }

  ngOnInit(): void {
    this.subscription = this.userService.observableUser
    .subscribe( (item:any) => {
      if(item.username === ""){
        this.isLoggedIn = false;
        this.clsNavLink = 'nav-link disabled'
      }else{
        this.isLoggedIn = true;
        this.clsNavLink = 'nav-link'
        this.username = "Welcome, " + item.username;
      }
    })

    this.subscription2 = this.walletInfoService.observableWallet
    .subscribe(
      (item:any) => {
        if(item.net_worth < 0){
          this.navClass = "navbar sticky-top navbar-expand-lg navbar-light negative"
        } else {
          this.navClass = "navbar sticky-top navbar-expand-lg navbar-light bg-success"
        }
      }
    )

  }

}
