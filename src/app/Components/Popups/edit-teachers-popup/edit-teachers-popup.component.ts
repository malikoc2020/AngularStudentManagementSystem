import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/Models/Course/course';
import { User } from 'src/app/Models/User/user';
import { CourseService } from 'src/app/Services/Course/course.service';
import { UserService } from 'src/app/Services/User/user.service';


/////////////////////////////////////////////////////////////////////////
import { AfterViewInit,  OnDestroy, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
//import { Bank, BANKS } from 'src/app/Models/demo-data';

//import { VERSION } from '@angular/material';

import { MatSelectSearchVersion } from 'ngx-mat-select-search';
import { VERSION } from '@angular/material/core';
import { HttpHeaders } from '@angular/common/http';

  @Component({
    selector: 'app-edit-teachers-popup',
    templateUrl: './edit-teachers-popup.component.html',
    styleUrls: ['./edit-teachers-popup.component.css']
  })
  export class EditTeachersPopupComponent implements OnInit {
    headers!: HttpHeaders;

    userModel: User = new User;


    userForm!: FormGroup;
    loading:boolean =false;
    success:boolean =false;
    info:string="";
    rolId:number = -1;
    guncellemeTipi:string = "";
    guncellemeTipiButton:string = "";



    ////////////////////////////////////////////////////////////////////

version = VERSION;

matSelectSearchVersion = MatSelectSearchVersion;

/** list of banks */
//protected banks: Bank[] = BANKS;

  /** list of banks */
  //protected banks: Bank[] = BANKS;

  protected kurses!: Course[];

/** control for the selected bank */
public kursCtrl: FormControl = new FormControl();

/** control for the MatSelect filter keyword */
public kursFilterCtrl: FormControl = new FormControl();

/** list of banks filtered by search keyword */
public filteredKurses: ReplaySubject<Course[]> = new ReplaySubject<Course[]>(1);


  @ViewChild('multiSelect')
  multiSelect!: MatSelect;

/** Subject that emits when the component has been destroyed. */
protected _onDestroy = new Subject<void>();
////////////////////////////////////////////////////////////////////


    constructor(public modal:NgbActiveModal,private userService:UserService, private courseService:CourseService,private router:Router, private route:ActivatedRoute) { }

    ngOnInit(): void {

      let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

     // console.log(this.userModel);

      this.rolId = this.userModel.rolId;

      if(this.rolId ==1)
      {
        this.guncellemeTipi="Yönetici";
        this.guncellemeTipiButton ="Yöneticiyi";
      }else    if(this.rolId ==2)
      {
        this.guncellemeTipi="Öğretmen";
        this.guncellemeTipiButton ="Öğretmeni";
      }else    if(this.rolId ==3)
      {
        this.guncellemeTipi="Öğrenci";
        this.guncellemeTipiButton ="Öğrenciyi";
      }

      this.userForm = new FormGroup(
        {
          id:new FormControl(this.userModel.id,[Validators.required]),
          email:new FormControl(this.userModel.email,[Validators.required,Validators.email]),
          name:new FormControl(this.userModel.name,[Validators.required]),
          surName:new FormControl(this.userModel.surName,[Validators.required]),
          rolId:new FormControl(this.userModel.rolId/*,[Validators.required,Validators.min(1), Validators.max(3)]*/),
          educationDetail:new FormControl(this.userModel.educationDetail),
          personalDetail:new FormControl(this.userModel.personalDetail),
          qualification:new FormControl(this.userModel.qualification),
          hataliGirisSayisi:new FormControl(this.userModel.hataliGirisSayisi)
        }
      );


      this.courseService.courseList(-1,'-1',this.headers).subscribe(data=>{
        this.kurses = data;
        this.info = '';

        this.filteredKurses.next(this.kurses.slice());

        /*if(this.courseModel.kullaniciId>0)//eğer mevcut bir öğretmeni varsa kursun ekrana yansıt
        {
         //console.log(this.users.find(x=>x.id ==this.courseModel.kullaniciId));
         this.userCtrl.setValue(this.users.find(x=>x.id ==this.courseModel.kullaniciId));
        }*/
             this.loading = false;
        },error=>
        {
          this.info = "Kursları getirmede bir hata meydana geldi.";
        });


        ////////////////////////////////////////////////////////////////////
     // set initial selection
     //this.userCtrl.setValue(this.users/*[10]*/);

     //console.log(this.users);

     // load the initial bank list
     //this.filteredUsers.next(this.users.slice());

     // listen for search field value changes
     this.kursFilterCtrl.valueChanges
     .pipe(takeUntil(this._onDestroy))
     .subscribe(() => {
       this.filterKurses();
       //console.log('userFilteredCtrl.valuechanges ...');
     });


////////////////////////////////////////////////////////////////////
    }

    onsubmit(){

      this.info = "";
      //console.log(this.userForm.value);
      if(this.userForm?.valid)
      {
        this.loading=true;
        this.userService.userUpdate(this.userForm.value, this.headers).subscribe(params=>{

          let adsoyad:string = this.userForm.value["name"] + " " + this.userForm.value["surName"];
            this.success=true;

             /*this.userForm.reset({
                'name': '',
                'surName': '',
                'email': '',
                'educationDetail': '',
                'personalDetail': '',
                'qualification': '',
                'rolId':''
               });*/

            this.userModel.name = this.userForm.value["name"];
            this.userModel.surName = this.userForm.value["surName"];
            this.userModel.email = this.userForm.value["email"];
            this.userModel.educationDetail = this.userForm.value["educationDetail"];
            this.userModel.personalDetail = this.userForm.value["personalDetail"];
            this.userModel.qualification = this.userForm.value["qualification"];
            this.userModel.hataliGirisSayisi = this.userForm.value["hataliGirisSayisi"];


            this.info = adsoyad + " başarıyla Güncellenmiştir.";
            this.loading=false;

            setTimeout(() =>
            this.modal.close(),750);


        },error=>
        {
          this.success=false;
          let errorMessage:string  = error['error'];
          this.info = "Bir hata meydana geldi. Hata Açıklama:" + errorMessage;
          this.loading=false;
        });

        return this.success;
      }else
      {
        return false;
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

    get userControls()
    {
      return this.userForm.controls;
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
      this.filteredKurses
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          // setting the compareWith property to a comparison function
          // triggers initializing the selection according to the initial value of
          // the form control (i.e. _initializeSelection())
          // this needs to be done after the filteredBanks are loaded initially
          // and after the mat-option elements are available
          this.multiSelect.compareWith = (a: User, b: User) => a && b && a.id === b.id;

          //console.log('setInitialValue çalıştı.');

        });

        //this.userFilterCtrl.setValue(this.dataSource[2].code);
    }

    protected filterKurses() {

      //console.log('filterBanks() tetiklendi');

      if (!this.kurses) {
       // console.log('this.users is null');
        return;
      }
      // get the search keyword
      let search = this.kursFilterCtrl.value;
     // console.log('search=' + search);

      if (!search) {
        this.filteredKurses.next(this.kurses.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the banks
      this.filteredKurses.next(
        this.kurses.filter(kurs => kurs.name.toLowerCase().indexOf(search) > -1)
      );
    }

    ///////////////////////////////////////////////////////////////////
  }
