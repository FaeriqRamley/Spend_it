import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public username='';
  public isLoggedIn=false;
  public clsNavLink = 'nav-link'

  private subscription: Subscription;
  
  constructor(
    private userService:UserService
  ) {
    this.subscription = this.userService.observableUser
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
  }

}
