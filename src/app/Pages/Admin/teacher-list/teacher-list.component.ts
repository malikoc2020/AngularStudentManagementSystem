import { FormControl, FormGroup } from '@angular/forms';

import {OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {User } from 'src/app/Models/User/user';
import {UserService } from 'src/app/Services/User/user.service';
import { HttpHeaders } from '@angular/common/http';
//import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
//import {NewUserPopupComponent } from 'src/app/Components/Popups/new-user-popup/new-user-popup.component';


@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})


export class TeacherListComponent implements OnInit  {
  headers!:HttpHeaders;
  teacherListForm!: FormGroup;
  loading:boolean =false;
  success:boolean =true;
  info:string ="";


  displayedColumns: string[] = ['id', 'name', 'surName', 'email','hataliGirisSayisi','educationDetail','personalDetail','qualification'];
  dataSource:MatTableDataSource<User> =new MatTableDataSource<User>([]);;
  teachers:User[]=[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private userService:UserService//,
              //private dialog:MatDialog
    ) { }


  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + token);

      this.teacherListForm = new FormGroup(
      {
        name:new FormControl(""),
        surName:new FormControl(""),
        email:new FormControl("")
      }
    );
  }

  onsubmit(){
    this.loading=true;
    this.info ="";
    var frm:any = this.teacherListForm.value;
    //console.log(frm);
    //console.log(frm['name']);
    //console.log(frm['surname']);
    //console.log(frm['email']);
    let name:string = frm['name'];
    let surname:string=frm['surName'];
    let email:string=frm['email'];

    if(name=='')
      name = '-1';
      if(surname=='')
      surname = '-1';
      if(email=='')
      email = '-1';

    this.userService.userListByRole(2,name,surname,email,this.headers).subscribe(data=>{
        this.teachers = data;
        this.dataSource = new MatTableDataSource<User>(data);
        this.dataSource.paginator=this.paginator;
        this.loading=false;
        this.success=true;
    },error=>
    {
      this.loading=false;
      this.success=false;
      this.info = "Bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.";
    });

    //console.log(this.teachers);
  }


  // onCreate(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose= true;
  //   dialogConfig.autoFocus=true;
  //   dialogConfig.width="60%";
  //   this.dialog.open(NewUserPopupComponent,dialogConfig);
  // }

}
