import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-nav',
  templateUrl: './teacher-nav.component.html',
  styleUrls: ['./teacher-nav.component.css']
})
export class TeacherNavComponent implements OnInit {
  currentUserName:string =String(localStorage.getItem('currentUserName'));
  currentUserSurname:string =String(localStorage.getItem('currentUserSurname'));
  constructor() { }

  ngOnInit(): void {
  }

}
