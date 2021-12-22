import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentCourse } from 'src/app/Models/Course/student-course';
import { User } from 'src/app/Models/User/user';
import { CourseService } from 'src/app/Services/Course/course.service';
/////////////////////////////////////////////////////////////////////////
import { AfterViewInit,  OnDestroy, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { MatSelectSearchVersion } from 'ngx-mat-select-search';
import { VERSION } from '@angular/material/core';
import { Course } from 'src/app/Models/Course/course';
import { StudentCourceServiceService } from 'src/app/Services/StudentCource/student-cource-service.service';
import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-student-course-popup',
  templateUrl: './student-course-popup.component.html',
  styleUrls: ['./student-course-popup.component.css']
})
export class StudentCoursePopupComponent implements OnInit, AfterViewInit, OnDestroy {
  headers!: HttpHeaders;

  courseModel: StudentCourse = new StudentCourse;

  courseForm!: FormGroup;
  loading:boolean =true;
  success:boolean =false;
  info:string="";
  islemTipi:string = "";
  //currentCourseId:number = 0;

////////////////////////////////////////////////////////////////////
version = VERSION;
matSelectSearchVersion = MatSelectSearchVersion;
/** list of banks */
//protected banks: Bank[] = BANKS;

  /** list of banks */
  //protected banks: Bank[] = BANKS;

private courses!: Course[];

/** control for the selected bank */
public courseCtrl: FormControl = new FormControl();

/** control for the MatSelect filter keyword */
public courseFilterCtrl: FormControl = new FormControl();

/** list of banks filtered by search keyword */
public filteredCourses: ReplaySubject<Course[]> = new ReplaySubject<Course[]>(1);


  @ViewChild('singleSelect')
  singleSelect!: MatSelect;

  @ViewChild('inputCourseFees')
  inputCourseFees!: ElementRef;

/** Subject that emits when the component has been destroyed. */
protected _onDestroy = new Subject<void>();
////////////////////////////////////////////////////////////////////


  constructor(public modal:NgbActiveModal
    ,private courseService:CourseService
    , private studentCourseService:StudentCourceServiceService
    ,private datePipe: DatePipe) { }

  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    this.courseForm = new FormGroup(
      {
        id:new FormControl(this.courseModel.id),
        kullaniciId:new FormControl(this.courseModel.kullaniciId,[Validators.required]),
        kullaniciAdSoyad:new FormControl(this.courseModel.kullaniciAdSoyad,[Validators.required]),
        courseId:new FormControl(this.courseModel.courseId),
        courseName:new FormControl(this.courseModel.courseName),
        courseFees:new FormControl(this.courseModel.courseFees,[Validators.required]),
        paidFees:new FormControl(this.courseModel.paidFees,[Validators.required]),
        startDate:new FormControl(this.courseModel.startDate),
        finishDate:new FormControl(this.courseModel.finishDate),
        statuId:new FormControl(this.courseModel.statuId,[Validators.required, Validators.min(1)])//,
        //statusName:new FormControl(this.courseModel.statusName,[Validators.required])//,
      }
    );

   if(this.courseModel.id>0)//Güncelleme
   {
     this.loading = false;
     this.islemTipi="Kurs Güncelle";
     let currentCourse:Course = new Course;
     currentCourse.id = this.courseModel.courseId;
     currentCourse.name = this.courseModel.courseName;

     //console.log(this.courses);
     this.courses = [];
     this.courses.push(currentCourse);
     this.filteredCourses.next(this.courses.slice());
     this.courseCtrl.setValue(this.courses.find(x=>x.id ==currentCourse.id));
   }else
   {
     this.islemTipi="Kurs Ekle";

     this.courseService.courseList(-1,'-1',this.headers).subscribe(data=>{
      this.courses = data;
      this.info = '';

           this.filteredCourses.next(this.courses.slice());
           this.loading = false;
      },error=>
      {
        this.info = "Kursları getirmede bir hata meydana geldi.";
      });

   }

  ////////////////////////////////////////////////////////////////////
     // set initial selection
     //this.userCtrl.setValue(this.users/*[10]*/);

     //console.log(this.users);

     // load the initial bank list
     //this.filteredUsers.next(this.users.slice());

     // listen for search field value changes
     this.courseFilterCtrl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterCourses();
         //console.log('userFilteredCtrl.valuechanges ...');
       });


////////////////////////////////////////////////////////////////////


  }

  onsubmit(){
    this.success = true;
    this.info = "";

    if(this.courseForm?.valid)
    {
      this.courseForm.value["startDate"] = this.datePipe.transform(this.courseForm.value["startDate"], 'yyyy-MM-dd');
      this.courseForm.value["finishDate"] = this.datePipe.transform(this.courseForm.value["finishDate"], 'yyyy-MM-dd');


      this.loading=true;
      if(this.islemTipi=="Kurs Ekle")
      {
        if(this.courseCtrl.value == null)
        {
              this.info = "Lütfen bir kurs seçiniz.";
              this.success=false;

              this.loading = false;
              return;
        }else{
          this.courseForm.value["courseId"] = this.courseCtrl.value["id"];
          this.courseForm.value["courseName"] = this.courseCtrl.value["name"];


        }
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
      //console.log("Kayıt işlemi sırasında = "+ this.courseForm.value["courseFees"]);
      //console.log("Kayıt işlemi model = "+ this.courseModel.courseFees);
      //console.log(this.courseForm.value);

      this.studentCourseService.studentCourseInsert(this.courseForm.value, this.headers).subscribe(params=>{

        let namee:string = this.courseForm.value["courseName"];
        this.success=true;

        this.courseModel.id = Number(params);
        this.courseModel.kullaniciId = this.courseForm.value["kullaniciId"];

        this.courseModel.courseId = this.courseForm.value["courseId"];
        this.courseModel.courseName = this.courseForm.value["courseName"];

        this.courseModel.courseFees = this.courseForm.value["courseFees"];
        this.courseModel.paidFees = this.courseForm.value["paidFees"];

        this.courseModel.startDate = this.courseForm.value["startDate"];
        this.courseModel.finishDate = this.courseForm.value["finishDate"];

        this.courseModel.statuId = this.courseForm.value["statuId"];

        this.info = namee + " Başarıyla Eklenmiştir.";
        this.loading=false;

        setTimeout(() =>
        this.modal.close(),750);

      },error=>
      {
        console.log(error);
        this.success=false;
        let errorMessage:string  = error['error'];
        this.info = "Bir hata meydana geldi. Hata Açıklama:" + errorMessage;
        this.loading=false;
      });
    }

    KursGuncelle()
    {
      this.studentCourseService.studentCourseUpdate(this.courseForm.value,this.headers).subscribe(params=>{

        let namee:string = this.courseForm.value["courseName"];
        this.success=true;

        //this.courseModel.id = Number(params);
        //this.courseModel.kullaniciId = this.courseForm.value["kullaniciId"];

        //this.courseModel.courseId = this.courseForm.value["courseId"];
        //this.courseModel.courseName = this.courseForm.value["courseName"];

        this.courseModel.courseFees = this.courseForm.value["courseFees"];
        this.courseModel.paidFees = this.courseForm.value["paidFees"];

        this.courseModel.startDate = this.courseForm.value["startDate"];
        this.courseModel.finishDate = this.courseForm.value["finishDate"];

        this.courseModel.statuId = this.courseForm.value["statuId"];

        this.info = namee + " Başarıyla Güncellenmiştir.";
        this.loading=false;

        setTimeout(() =>
        this.modal.close(),750);

      },error=>
      {
        console.log(error);
        this.success=false;
        let errorMessage:string  = error['error'];
        this.info = "Bir hata meydana geldi. Hata Açıklama:" + errorMessage;
        this.loading=false;
      });
    }

    KursSil()
    {
      if(confirm(this.courseModel.courseName  + " isimli kursu silmek istediğinizden emin misiniz?")) {

      this.studentCourseService.studentCourseDelete(this.courseModel.id,this.headers).subscribe(params=>{

        let namee:string = this.courseModel.courseName;
        this.success=true;

        this.courseModel.id = 0;

        this.info = namee + " Başarıyla Silinmiştir.";
        this.loading=false;

        setTimeout(() =>
        this.modal.close(),750);

      },error=>
      {
        console.log(error);
        this.success=false;
        let errorMessage:string  = error['error'];
        this.info = "Bir hata meydana geldi. Hata Açıklama:" + errorMessage;
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
          return name + ' alanı boş bırakılamaz.';
        }
        if(errorname == "email")
        {
          return name + ' alanı formatı yanlış.';
        }
        if(errorname == "min")
        {
          return name + ' alanı olması gereken en düşük değerden daha az.';
        }
        if(errorname == "max")
        {
          return name + ' alanı olması gereken en büyük değerden daha fazla.';
        }
      }
    }
    //herhangi bir validationa takılmamış.
    return '';
  }

  get courseControls()
  {
    return this.courseForm.controls;
  }










////////////////////////////////////////////////////////////////////////////////////////////////////

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

    /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
     protected setInitialValue() {
      this.filteredCourses
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          // setting the compareWith property to a comparison function
          // triggers initializing the selection according to the initial value of
          // the form control (i.e. _initializeSelection())
          // this needs to be done after the filteredBanks are loaded initially
          // and after the mat-option elements are available
          this.singleSelect.compareWith = (a: User, b: User) => a && b && a.id === b.id;

          //console.log('setInitialValue çalıştı.');

        });

        //this.userFilterCtrl.setValue(this.dataSource[2].code);
    }

    protected filterCourses() {

      //console.log('filterBanks() tetiklendi');

      if (!this.courses) {
       // console.log('this.users is null');
        return;
      }
      // get the search keyword
      let search = this.courseFilterCtrl.value;
     // console.log('search=' + search);

      if (!search) {
        this.filteredCourses.next(this.courses.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the banks
      this.filteredCourses.next(
        this.courses.filter(course => course.name.toLowerCase().indexOf(search) > -1)
      );
    }

    ///////////////////////////////////////////////////////////////////


    onChange() {
      console.log(this.courseCtrl.value);
      //console.log(this.courseForm.value["courseFees"]);
      //this.courseModel.courseFees = this.courseCtrl.value["fees"];
      //this.inputCourseFees.nativeElement.value= this.courseCtrl.value["fees"];
      //this.courseForm.value["courseFees"] = this.courseCtrl.value["fees"];
      this.courseForm.controls["courseFees"].setValue(this.courseCtrl.value["fees"]);
      //console.log("TextChange olduktan sonra form = "+ this.courseForm.value["courseFees"]);
      //console.log("TextChange olduktan sonra model = "+ this.courseModel.courseFees);

    }

}


