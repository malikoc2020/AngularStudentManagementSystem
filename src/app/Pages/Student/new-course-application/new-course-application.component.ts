import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserPopupComponent } from 'src/app/Components/Popups/edit-user-popup/edit-user-popup.component';
import { User } from 'src/app/Models/User/user';
import { UserService } from 'src/app/Services/User/user.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { NewUserPopupComponent } from 'src/app/Components/Popups/new-user-popup/new-user-popup.component';
import { Course } from 'src/app/Models/Course/course';
import { CourseService } from 'src/app/Services/Course/course.service';
import { CorusePopupComponent } from 'src/app/Components/Popups/coruse-popup/coruse-popup.component';
import { StudentCourceServiceService } from 'src/app/Services/StudentCource/student-cource-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-course-application',
  templateUrl: './new-course-application.component.html',
  styleUrls: ['./new-course-application.component.css']
})
export class NewCourseApplicationComponent implements OnInit {
  headers!:HttpHeaders;
  newCourse:Course = new Course;
  userId:number = 0;
  courseList:Array<Course> = [];

  courseListForm!: FormGroup;
  loading:boolean =false;
  success:boolean =true;
  info:string ="";


  displayedColumns: string[] = [/*'id'*/'No', 'name', 'fees', 'durationYear','durationMonth','durationWeek','kullaniciAd','durationDay', 'buttons'];
  dataSource:MatTableDataSource<Course> =new MatTableDataSource<Course>([]);;
  //teachers:User[]=[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private courseService:CourseService, private studentCourseService:StudentCourceServiceService, private router:Router, private modalService:NgbModal) { }

  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    this.userId = Number(localStorage.getItem('currentUserId'));

    this.courseListForm = new FormGroup(
      {
        name:new FormControl("")
      }
    );

    //this.setUsersList();
  }

  kaydol(course:Course)
  {
    if(confirm(course.name + " isimli kursa kaydolmak istediğinizden emin misiniz?")) {

      let courseForm:FormGroup = new FormGroup(
        {
          id:new FormControl(0),
          kullaniciId:new FormControl(this.userId),
          kullaniciAdSoyad:new FormControl(""),
          courseId:new FormControl(course.id),
          courseName:new FormControl(""),
          courseFees:new FormControl(course.fees),
          paidFees:new FormControl(0),
          startDate:new FormControl(null),
          finishDate:new FormControl(null),
          statuId:new FormControl(1)//,
          //statusName:new FormControl(this.courseModel.statusName,[Validators.required])//,
        }
        );

        this.studentCourseService.studentCourseInsert(courseForm.value,this.headers).subscribe(params=>{

          this.info = course.name + " Başarıyla Eklenmiştir.";
          this.loading=false;
          this.success=true;
          // setTimeout(() =>
          // this.modal.close(),750);

        },error=>
        {
          console.log(error);
          this.success=false;
          let errorMessage:string  = error['error'];
          this.info = "Bir hata meydana geldi. Hata Açıklama:" + errorMessage;
          this.loading=false;
        });


    }
  }




  onsubmit(){
    this.loading=true;
    this.info ="";
    var frm:any = this.courseListForm.value;

    let name:string = frm['name'];

    if(name=='')
      name = '-1';


    this.courseService.courseList(-1,name,this.headers).subscribe(data=>{
        this.courseList = data;
        this.dataSource = new MatTableDataSource<Course>(data);
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

  ListeyiYenile()
  {
    this.dataSource = new MatTableDataSource<Course>(this.courseList);
    this.dataSource.paginator=this.paginator;
  }

}
