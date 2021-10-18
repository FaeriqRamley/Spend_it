import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor() { }

  public userLogin = true;
  public userName = ''
  public userEmail = '';
  public userPassword = '';
  public userCfmPassword = '';
  public errMsg = '';

  toggleLoginSignup(event:any){
    event.preventDefault();
    this.userLogin = !this.userLogin;
    this.errMsg = '';
  }

  ngOnInit(): void {
  }

}
