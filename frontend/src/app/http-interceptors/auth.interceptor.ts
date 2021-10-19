import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { retry,retryWhen } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private userService:UserService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
		const req = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.userService.currentUser.accessToken}`
			}
		})

		return next.handle(req)
	}
}
