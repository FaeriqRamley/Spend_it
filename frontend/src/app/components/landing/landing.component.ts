import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
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
    console.log(this.userService.currentUser.username)
  }

  handleSubmitLogin(event:any){
    event.preventDefault();
    const user = {email: this.userEmail,password: this.userPassword};
    this.userService.loginUser(user)
    .subscribe(
      data => this.userService.updateLoginUser(data),
      err => this.errMsg = err.error.message
    );

  }

  handleSubmitSignup(event:any){
    event.preventDefault();    
    const newUser = {
      username: this.userName,
      email: this.userEmail,
      password: this.userPassword
    }

    this.errMsg = this.userService.validateSignup({...newUser, userCfmPassword:this.userCfmPassword});

    if(this.errMsg === ""){
      this.userService.signupUser(newUser)
      .subscribe(data=>{console.log('signup success!')},err=>{err.error.message});
    }
  }

  ngOnInit(): void {
  }

}
