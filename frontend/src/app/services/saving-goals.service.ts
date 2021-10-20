import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

interface createSavings {
  target:number,
  title:string
}

@Injectable({
  providedIn: 'root'
})

export class SavingGoalsService {
  public userSavings:any = []
  public observableUserSavings:any;

  constructor(private http:HttpClient,private userService:UserService) {
    this.observableUserSavings = new BehaviorSubject(this.userSavings)
  }
  
  eventChange(){
    this.observableUserSavings.next(this.userSavings);
  }

  refreshUserSavings(){
    this.http.get(`http://localhost:5000/savingGoal/viewGoals/${this.userService.currentUser.uuid}`)
    .subscribe(
      (data:any)=>{
        this.userSavings = []
        for (const saving of data){
          this.userSavings.push({
            uuid: saving.uuid,
            title: saving.title,
            current: saving.current,
            target: saving.target
          })
          this.eventChange();
        }
      },
      err=>{
      },
      ()=>{
        console.log('user savings refreshed')
      }
    )
  }

  createUserSavings(input:createSavings){
    this.http.post(`http://localhost:5000/savingGoal/createGoal/${this.userService.currentUser.uuid}`,input)
    .subscribe(
      data=>{
        this.refreshUserSavings();
      },
      err=>{
        console.log('createUserSavings error:',err)
      },
      ()=>{
        console.log('create user done');
      }
    )
  }

}
