import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  currentUserName:string =String(localStorage.getItem('currentUserName'));
  currentUserSurname:string =String(localStorage.getItem('currentUserSurname'));
  constructor() { }

  ngOnInit(): void {
  }

}
