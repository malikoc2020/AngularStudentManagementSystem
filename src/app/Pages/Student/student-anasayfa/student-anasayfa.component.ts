
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { NewUserPopupComponent } from 'src/app/Components/Popups/new-user-popup/new-user-popup.component';
import { Course } from 'src/app/Models/Course/course';
import { CourseService } from 'src/app/Services/Course/course.service';
import { CorusePopupComponent } from 'src/app/Components/Popups/coruse-popup/coruse-popup.component';
import { CourseStudentsPopupComponent } from 'src/app/Components/Popups/course-students-popup/course-students-popup.component';
import { StudentCourse } from 'src/app/Models/Course/student-course';
import { StudentCourceServiceService } from 'src/app/Services/StudentCource/student-cource-service.service';
import { HttpHeaders } from '@angular/common/http';
import { StudentNotificationPopupComponent } from 'src/app/Components/Popups/student-notification-popup/student-notification-popup.component';

@Component({
  selector: 'app-student-anasayfa',
  templateUrl: './student-anasayfa.component.html',
  styleUrls: ['./student-anasayfa.component.css']
})
export class StudentAnasayfaComponent implements OnInit {

  headers!:HttpHeaders;
  userId:number = 0;
  courseList:Array<StudentCourse> = [];

  //courseListForm!: FormGroup;
  loading:boolean =false;
  success:boolean =true;
  info:string ="";


  displayedColumns: string[] = [/*'id'*/'No', 'courseName', 'courseFees', 'paidFees','statuName','startDate','finishDate', 'bildirim'];
  dataSource:MatTableDataSource<StudentCourse> =new MatTableDataSource<StudentCourse>([]);;
  //teachers:User[]=[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private courseService:StudentCourceServiceService, private modalService:NgbModal) { }

  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    this.userId = Number(localStorage.getItem('currentUserId'));

    this.loading=true;
    this.info ="";

    console.log(this.userId);

    this.courseService.GetStudentCourses(this.userId,this.headers).subscribe(data=>{
        this.courseList = data;
        this.dataSource = new MatTableDataSource<StudentCourse>(data);
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

  openNotificationItem(course:Course ,notificationModel:Notification)
  {
    //this.router.navigateByUrl('');
    //console.log(studentCourseModel);
    let options: NgbModalOptions = {
      size: 'xl'
    };

    const ref =   this.modalService.open(StudentNotificationPopupComponent,options);
    ref.componentInstance.notificationModel = notificationModel;
    ref.componentInstance.courseName = course.name;


    ref.result.then((yes)=>{
        console.log("Ok click");

    },
    (cancel)=>{
        console.log("Cancel click");
    })
  }


}
