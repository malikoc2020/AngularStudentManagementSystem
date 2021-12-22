import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/Models/User/user';
import { UserService } from 'src/app/Services/User/user.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Course } from 'src/app/Models/Course/course';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-course-students-popup',
  templateUrl: './course-students-popup.component.html',
  styleUrls: ['./course-students-popup.component.css']
})
export class CourseStudentsPopupComponent implements OnInit {
  headers!:HttpHeaders;
  courseModel: Course = new Course;

  userList:Array<User> = [];

  //studentListForm!: FormGroup;
  loading:boolean =false;
  success:boolean =true;
  info:string ="";
  rolId:number = 3;



  displayedColumns: string[] = [/*'id'*/'No', 'name', 'surName', 'email','educationDetail','personalDetail','qualification','kurslari'];
  dataSource:MatTableDataSource<User> =new MatTableDataSource<User>([]);;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private userService:UserService, private router:Router, private modalService:NgbModal) { }

  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + token);

    // this.studentListForm = new FormGroup(
    //   {
    //     name:new FormControl(""),
    //     surName:new FormControl(""),
    //     email:new FormControl("")
    //   }
    //);

    this.Listele();
    //this.setUsersList();
  }


  // onsubmit(){
  //   this.Listele();
  // }

  // ListeyiYenile()
  // {
  //   this.dataSource = new MatTableDataSource<User>(this.userList);
  //   this.dataSource.paginator=this.paginator;
  // }

  Listele()
  {
    this.loading=true;
    this.info ="";
    // var frm:any = this.studentListForm.value;
    // let name:string = frm['name'];
    // let surname:string=frm['surName'];
    // let email:string=frm['email'];

    // if(name=='')
    // {

    //   this.studentListForm.value['name']  = '-1';
    // }

    //   if(surname=='')
    //   {

    //     this.studentListForm.value['surName']  = '-1';
    //   }
    //   if(email=='')
    //   {

    //     this.studentListForm.value['email']  = '-1';
    //   }

    this.userService.getCourseStudents(this.courseModel.id,this.headers).subscribe(data=>{
      console.log(data);
        this.userList = data;
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
  }
}
