import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(
    private userService: UserService
  ) { }

  public userLogin = true;
  public userName = ''
  public userEmail = '';
  public userPassword = '';
  public userCfmPassword = '';
  public errMsg = '';
  public response:any;

  toggleLoginSignup(event:any){
    event.preventDefault();
    this.userLogin = !this.userLogin;
    this.errMsg = '';
  }

  handleSubmitLogin(event:any){
    event.preventDefault();
    const user = {
      email: this.userEmail,
      password: this.userPassword
    };
    this.userService.loginUser(user)
    .subscribe( data => this.response = data )

    console.log(user);
  }

  ngOnInit(): void {
  }

}
