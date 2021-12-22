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
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  headers!: HttpHeaders;
  newCourse:Course = new Course;

  courseList:Array<Course> = [];

  courseListForm!: FormGroup;
  loading:boolean =false;
  success:boolean =true;
  info:string ="";


  displayedColumns: string[] = [/*'id'*/'No', 'name', 'fees', 'durationYear','durationMonth','durationWeek','durationDay','kullaniciAd', 'Guncelle/Sil'];
  dataSource:MatTableDataSource<Course> =new MatTableDataSource<Course>([]);;
  //teachers:User[]=[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private courseService:CourseService, private router:Router, private modalService:NgbModal) { }

  ngOnInit(): void {

    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    //this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    this.courseListForm = new FormGroup(
      {
        name:new FormControl("")
      }
    );

    //this.setUsersList();
  }

  // createItem()
  // {
  //    let courseModel:Course = new Course;
  //   //  courseModel.rolId=this.rolId;
  //   //  courseModel.hataliGirisSayisi = 0;

  //   const ref =   this.modalService.open(NewUserPopupComponent);
  //   ref.componentInstance.userModel = userModel;

  //   ref.result.then((yes)=>{
  //       console.log("Ok click");
  //       //this.userList[0].hataliGirisSayisi = 10;
  //       //console.log(userModel.hataliGirisSayisi);
  //       //console.log(ref.componentInstance.userModel.hataliGirisSayisi);

  //       //userModel.hataliGirisSayisi = ref.componentInstance.userModel.hataliGirisSayisi;
  //       this.userList.push(userModel);
  //       this.dataSource = new MatTableDataSource<User>(this.userList);
  //       this.dataSource.paginator=this.paginator;
  //   },
  //   (cancel)=>{
  //       console.log("Cancel click");
  //   })
  // }

  editItem(courseModel:Course)
  {
    //console.log(this.newCourse);
    //console.log(courseModel);

    const ref =   this.modalService.open(CorusePopupComponent);
    ref.componentInstance.courseModel = courseModel;

    ref.result.then((yes)=>{

        console.log("Ok click");

        if(ref.componentInstance.islemTipi =="Kurs Ekle")
        {
          this.courseList.push(courseModel);
          this.ListeyiYenile();
          this.newCourse = new Course();
        }
    },
    (cancel)=>{
        console.log("Cancel click");
    })
  }

  deleteItem(course:Course)
  {

    if(confirm(course.name + " isimli kursu silmek istediğinizden emin misiniz?")) {
    this.courseService.courseDelete(course.id,this.headers).subscribe(x=>
      {
        this.courseList.splice(this.courseList.indexOf(course),1);

       this.ListeyiYenile();


        this.info = "";
      },error =>{
          this.info = "Bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.";
      }
      );

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
      console.log(error);
    });

    //console.log(this.teachers);
  }

  ListeyiYenile()
  {
    this.dataSource = new MatTableDataSource<Course>(this.courseList);
    this.dataSource.paginator=this.paginator;
  }

}
