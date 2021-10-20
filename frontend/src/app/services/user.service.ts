import { Injectable, Injector } from '@angular/core';
// import IUser from '../interfaces/userInterface';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError,BehaviorSubject } from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import { Router } from '@angular/router';
import { WalletInfoService } from './wallet-info.service';
import { SavingGoalsService } from './saving-goals.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private injector:Injector) {
    this.observableUser = new BehaviorSubject(this.currentUser);
  }

  public currentUser = {
    uuid: '',
    username: '',
    email: '',
    accessToken: ''
  }

  public localStorage = window.localStorage;
  public observableUser:any;

  eventChange(){
    this.observableUser.next(this.currentUser);
  }

  validateSignup(user:any){
    console.log(user);
    let outputErr:string = ""
    if (user.userCfmPassword !== user.password){
      outputErr += "Password does not match...\n"
    }
    if (user.password.length < 6){
      outputErr += "Password too short. Min 8 chars...\n"
    }
    if (!user.email.includes("@")){
      outputErr += "Invalid Email...\n"
    }
    console.log(outputErr);
    return outputErr
  }

  signupUser(signupInfo:Object){
    return this.http.post('http://localhost:5000/auth/signup',signupInfo);
  }
  
  loginUser(userInfo:Object){
    return this.http.post('http://localhost:5000/auth/login',userInfo)
  }

  updateLoginUser(data:any){
    const loggedUser:any = data;
    this.currentUser = {...loggedUser.user,accessToken:loggedUser.accessToken};
    const today = new Date();
    const expiryDate = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 7)
    const refreshTokenObj = {
      refreshToken: data.refreshToken,
      expiry: expiryDate 
    }

    this.localStorage.setItem('refreshToken',JSON.stringify(refreshTokenObj))

    this.eventChange();
    this.router.navigate(["/logger"]);
  }

  logoutUser(){
    this.currentUser = {
      uuid: '',
      username: '',
      email: '',
      accessToken: ''
    }
    this.localStorage.removeItem('refreshToken');
    this.eventChange();
  }

  validateRefreshToken(){
    const refreshTokenObj = this.localStorage.getItem('refreshToken')
    if(refreshTokenObj){
      const input = JSON.parse(refreshTokenObj);
      const today = new Date();
      if(new Date(input.expiry) >= today){
        return input
      }
      else{
        console.log('Token expired')
        this.logoutUser();
        this.router.navigate(["/landing"]);
        return false
      }
    } else {
      console.log("Token does not exist");
      return false
    }
  }

  userTokenRefresh(refreshToken:string){
    return this.http.post('http://localhost:5000/auth/refreshToken',{refreshToken})
  }

  updateAccessToken(data:any){
    this.currentUser.accessToken = data.accessToken;
    this.eventChange();
  }

  updateUserInfo(data:any){
    this.currentUser = {...this.currentUser, ...data.currUser};
    this.eventChange();
  }

  userRefresh(){
    const refTokenObj = this.validateRefreshToken()
    if(refTokenObj){
      console.log('refresh token has not expired. Logging user in');
      this.userTokenRefresh(refTokenObj.refreshToken)
      .subscribe(data => {
        console.log('Token verified and refreshed.');
        this.updateAccessToken(data);
        this.updateUserInfo(data);
      },error=>{
        console.log(error)
      },()=>{
        console.log(this.currentUser);
        const wallet = this.injector.get(WalletInfoService);
        const savings = this.injector.get(SavingGoalsService);
        wallet.getLatestUserWallet();
        savings.refreshUserSavings();
      })
    }
  }

}
