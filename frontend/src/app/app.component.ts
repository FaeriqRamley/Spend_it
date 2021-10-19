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
      if(this.userService.validateRefreshToken()){
        console.log('refresh token has not expired. Logging user in');
        const refTokenObj = JSON.parse(refreshToken);
        this.userService.userTokenRefresh(refTokenObj.refreshToken)
        .subscribe(data => {
          console.log('Token verified and refreshed.');
          this.userService.updateAccessToken(data);
          this.userService.updateUserInfo(data);
        },error=>{
          console.log(error)
        },()=>{
          console.log(this.userService.currentUser);
        })
      }
    } else {
      console.log("refresh token not detected");
    }
  }
}
