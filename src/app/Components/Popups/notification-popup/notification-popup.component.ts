import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/Models/User/user';
import { CourseService } from 'src/app/Services/Course/course.service';
/////////////////////////////////////////////////////////////////////////
import { AfterViewInit,  OnDestroy, ViewChild } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';

import { Course } from 'src/app/Models/Course/course';
import { StudentCourceServiceService } from 'src/app/Services/StudentCource/student-cource-service.service';
import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Notification } from 'src/app/Models/Course/notification';
////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.css']
})
export class NotificationPopupComponent implements OnInit {
  headers!: HttpHeaders;

  notificationModel: Notification = new Notification;
  courseName:string = "";

  notificationForm!: FormGroup;
  loading:boolean =false;
  success:boolean =false;
  info:string="";
  islemTipi:string = "";


  constructor(public modal:NgbActiveModal
    ,private courseService:CourseService
    ,private datePipe: DatePipe) { }



  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    this.notificationForm = new FormGroup(
      {
        id:new FormControl(this.notificationModel.id),
        title:new FormControl(this.notificationModel.title,[Validators.required]),
        contentText:new FormControl(this.notificationModel.contentText,[Validators.required]),
        courseId:new FormControl(this.notificationModel.courseId)
      }
    );

   if(this.notificationModel.id>0)//G??ncelleme
   {
     this.islemTipi="Bildirim G??ncelle";
     let currentCourse:Course = new Course;
   }else
   {
     this.islemTipi="Bildirim Ekle";
   }
  }

  onsubmit(){
    this.success = true;
    this.info = "";

    if(this.notificationForm?.valid)
    {
      this.loading=true;
      if(this.islemTipi=="Bildirim Ekle")
      {
            this.YeniKursKaydet();
      }
      else
      {
            this.KursGuncelle();
      }
      return this.success;
    }else
    {
      return false;
    }
    }



    YeniKursKaydet()
    {

      this.courseService.notificationInsert(this.notificationForm.value, this.headers).subscribe(params=>{

        let namee:string = this.notificationForm.value["title"];
        this.success=true;

        this.notificationModel.id = Number(params);
        this.notificationModel.title = this.notificationForm.value["title"];
        this.notificationModel.contentText = this.notificationForm.value["contentText"];
        this.notificationModel.courseId = this.notificationForm.value["courseId"];


        this.info = namee + " Ba??ar??yla Eklenmi??tir.";
        this.loading=false;

        setTimeout(() =>
        this.modal.close(),750);

      },error=>
      {
        console.log(error);
        this.success=false;
        let errorMessage:string  = error['error'];
        this.info = "Bir hata meydana geldi. Hata A????klama:" + errorMessage;
        this.loading=false;
      });
    }

    KursGuncelle()
    {
      this.courseService.notificationUpdate(this.notificationForm.value,this.headers).subscribe(params=>{

        let namee:string = this.notificationForm.value["title"];
        this.success=true;

        this.notificationModel.title = this.notificationForm.value["title"];
        this.notificationModel.contentText = this.notificationForm.value["contentText"];

        this.info = namee + " Ba??ar??yla G??ncellenmi??tir.";
        this.loading=false;

        setTimeout(() =>
        this.modal.close(),750);

      },error=>
      {
        console.log(error);
        this.success=false;
        let errorMessage:string  = error['error'];
        this.info = "Bir hata meydana geldi. Hata A????klama:" + errorMessage;
        this.loading=false;
      });
    }

    NotificationSil()
    {
      if(confirm(this.notificationModel.title  + " ba??l??kl?? bildirimi silmek istedi??inizden emin misiniz?")) {

      this.courseService.notificationDelete(this.notificationModel.id,this.headers).subscribe(params=>{

        let namee:string = this.notificationModel.title;
        this.success=true;

        this.notificationModel.id = 0;

        this.info = namee + " Ba??ar??yla Silinmi??tir.";
        this.loading=false;

        setTimeout(() =>
        this.modal.close(),750);

      },error=>
      {
        console.log(error);
        this.success=false;
        let errorMessage:string  = error['error'];
        this.info = "Bir hata meydana geldi. Hata A????klama:" + errorMessage;
        this.loading=false;
      });
    }else
    {
      return;
    }

    }

  GetValidationMessages(f:AbstractControl, name:string)
  {
    if(f.errors)
    {

      for(let errorname in f.errors)
      {
        //console.log(errorname);
        if(errorname == "required")
        {
          return name + ' alan?? bo?? b??rak??lamaz.';
        }
        if(errorname == "email")
        {
          return name + ' alan?? format?? yanl????.';
        }
        if(errorname == "min")
        {
          return name + ' alan?? olmas?? gereken en d??????k de??erden daha az.';
        }
        if(errorname == "max")
        {
          return name + ' alan?? olmas?? gereken en b??y??k de??erden daha fazla.';
        }
      }
    }
    //herhangi bir validationa tak??lmam????.
    return '';
  }

  get notificationControls()
  {
    return this.notificationForm.controls;
  }

}


