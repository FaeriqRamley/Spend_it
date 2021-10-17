import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  constructor() { }
  
  favouriteColor = "red"
  
  handleButton(event:any){
    event.preventDefault()
    this.favouriteColor = "green"
  }

  ngOnInit(): void {
  }

}
