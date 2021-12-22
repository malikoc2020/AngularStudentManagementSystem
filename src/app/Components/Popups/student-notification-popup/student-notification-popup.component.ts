import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/Models/Course/notification';

@Component({
  selector: 'app-student-notification-popup',
  templateUrl: './student-notification-popup.component.html',
  styleUrls: ['./student-notification-popup.component.css']
})
export class StudentNotificationPopupComponent implements OnInit {
  notificationModel:Notification=new Notification;
  courseName:string = "";
  constructor() { }

  ngOnInit(): void {
    console.log(this.notificationModel);
  }

}
