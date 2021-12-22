import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-nav',
  templateUrl: './student-nav.component.html',
  styleUrls: ['./student-nav.component.css']
})
export class StudentNavComponent implements OnInit {
  currentUserName:string =String(localStorage.getItem('currentUserName'));
  currentUserSurname:string =String(localStorage.getItem('currentUserSurname'));
  constructor() { }

  ngOnInit(): void {
  }

}
