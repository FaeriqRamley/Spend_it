import { Injectable } from '@angular/core';
// import IUser from '../interfaces/userInterface';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError,BehaviorSubject } from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
    this.observableUser = new BehaviorSubject(this.currentUser);
  }

  public currentUser = {
    uuid: '',
    username: '',
    email: '',
    accessToken: ''
  }

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
    const loggedUser:any = data
    this.currentUser = {...loggedUser.user,accessToken:loggedUser.accessToken}
    const cookieDuration:Number = 60*60*24*7
    document.cookie = `refreshToken=${loggedUser.refreshToken};max-age:${cookieDuration}`
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
    document.cookie = 'refreshToken=null;max-age=0';
    this.eventChange();
  }
}
