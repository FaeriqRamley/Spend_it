import { Injectable } from '@angular/core';
// import IUser from '../interfaces/userInterface';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError,BehaviorSubject } from 'rxjs';
import {catchError,retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
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

  signupUser(signupInfo:Object){
    return this.http.post('http://localhost:5000/auth/signup',signupInfo);
  }

  loginUser(userInfo:Object){
    this.http.post('http://localhost:5000/auth/login',userInfo)
    .subscribe( data => {
      const loggedUser:any = data
      console.log(loggedUser);
      this.currentUser = {...loggedUser.user,accessToken:loggedUser.accessToken}
      const cookieDuration:Number = 60*60*24*7
      document.cookie = `refreshToken=${loggedUser.refreshToken};max-age:${cookieDuration}`
      console.log(this.currentUser);
      this.eventChange();
    });
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
