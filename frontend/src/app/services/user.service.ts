import { Injectable } from '@angular/core';
// import IUser from '../interfaces/userInterface';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {catchError,retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  loginUser(userInfo:Object){
    return this.http.post('http://localhost:5000/auth/login',userInfo);
  }
}
