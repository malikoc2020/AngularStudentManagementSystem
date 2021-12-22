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
import { HttpHeaders } from '@angular/common/http';
import { Notification } from 'src/app/Models/Course/notification';
import { NotificationPopupComponent } from 'src/app/Components/Popups/notification-popup/notification-popup.component';

@Component({
  selector: 'app-teacher-anasayfa',
  templateUrl: './teacher-anasayfa.component.html',
  styleUrls: ['./teacher-anasayfa.component.css']
})
export class TeacherAnasayfaComponent implements OnInit {
 headers!:HttpHeaders
 userId:number = 0;
  newCourse:Course = new Course;

  courseList:Array<Course> = [];

  courseListForm!: FormGroup;
  loading:boolean =false;
  success:boolean =true;
  info:string ="";


  displayedColumns: string[] = [/*'id'*/'No', 'name', 'fees', 'durationYear','durationMonth','durationWeek','durationDay', ' ','  ', 'bildirim'];
  dataSource:MatTableDataSource<Course> =new MatTableDataSource<Course>([]);;
  //teachers:User[]=[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private courseService:CourseService, private router:Router, private modalService:NgbModal) { }

  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    this.userId = Number(localStorage.getItem('currentUserId'));

    this.courseListForm = new FormGroup(
      {
        name:new FormControl("")
      }
    );
  }

  listItem(courseModel:Course)
  {
    let options: NgbModalOptions = {
      size: 'xl'
    };
    const ref =   this.modalService.open(CourseStudentsPopupComponent,options);
    ref.componentInstance.courseModel = courseModel;

    ref.result.then((yes)=>{
        //onsole.log("Ok click");
    },
    (cancel)=>{
        //console.log("Cancel click");
    })
  }

  // deleteItem(course:Course)
  // {

  //   if(confirm(course.name + " isimli kursu silmek istediğinizden emin misiniz?")) {
  //   this.courseService.courseDelete(course.id).subscribe(x=>
  //     {
  //       this.courseList.splice(this.courseList.indexOf(course),1);

  //      this.ListeyiYenile();


  //       this.info = "";
  //     },error =>{
  //         this.info = "Bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.";
  //     }
  //     );

  //   }
  // }




  onsubmit(){
    this.loading=true;
    this.info ="";
    var frm:any = this.courseListForm.value;

    let name:string = frm['name'];

    if(name=='')
      name = '-1';


    this.courseService.courseList(this.userId,name,this.headers).subscribe(data=>{
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





  addNotificationItem(course:Course /*kullaniciId:number, kullaniciAdSoyad:string*/)
  {
   let  notificationModel: Notification = new Notification;
  /* studentCourseModel.kullaniciId = kullaniciId;
   studentCourseModel.kullaniciAdSoyad = kullaniciAdSoyad;*/
   notificationModel.courseId = course.id;

    const ref =   this.modalService.open(NotificationPopupComponent);
    ref.componentInstance.notificationModel = notificationModel;
    ref.componentInstance.courseName = course.name;

    ref.result.then((yes)=>{
        //console.log("Ok click burada");
        //console.log(user);
        //console.log(user.studentCourses);
    course.notifications.push(notificationModel);
    this.ListeyiYenile();




    },
    (cancel)=>{
        console.log("Cancel click");
    })
  }

  editNotificationItem(course:Course ,notificationModel:Notification)
  {
    //this.router.navigateByUrl('');
    //console.log(studentCourseModel);

    const ref =   this.modalService.open(NotificationPopupComponent);
    ref.componentInstance.notificationModel = notificationModel;
    ref.componentInstance.courseName = course.name;

    let id:number = notificationModel.id;

    ref.result.then((yes)=>{
        console.log("Ok click");

        if(notificationModel.id<=0)//Silinmiş.
        {
            notificationModel.id = id;
            const index = course.notifications.indexOf(notificationModel, 0);
              if (index > -1) {
                course.notifications.splice(index, 1);
              }

              this.ListeyiYenile();
        }
    },
    (cancel)=>{
        console.log("Cancel click");
    })
  }



}
