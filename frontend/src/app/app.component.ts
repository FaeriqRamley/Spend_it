import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'spendit';

  constructor (private userService:UserService){}

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
  }
}