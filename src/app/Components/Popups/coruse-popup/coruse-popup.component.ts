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
////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-coruse-popup',
  templateUrl: './coruse-popup.component.html',
  styleUrls: ['./coruse-popup.component.css']
})
export class CorusePopupComponent implements OnInit, AfterViewInit, OnDestroy {
  headers!: HttpHeaders;

  courseModel:Course = new Course;

  courseForm!: FormGroup;
  loading:boolean =true;
  success:boolean =false;
  info:string="";
  islemTipi:string = "";

////////////////////////////////////////////////////////////////////

version = VERSION;

matSelectSearchVersion = MatSelectSearchVersion;

/** list of banks */
//protected banks: Bank[] = BANKS;

  /** list of banks */
  //protected banks: Bank[] = BANKS;

  protected users!: User[];

/** control for the selected bank */
public userCtrl: FormControl = new FormControl();

/** control for the MatSelect filter keyword */
public userFilterCtrl: FormControl = new FormControl();

/** list of banks filtered by search keyword */
public filteredUsers: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);


  @ViewChild('singleSelect')
  singleSelect!: MatSelect;

/** Subject that emits when the component has been destroyed. */
protected _onDestroy = new Subject<void>();
////////////////////////////////////////////////////////////////////


  constructor(public modal:NgbActiveModal,private courseService:CourseService, private userService:UserService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

   // console.log(this.courseModel);

    if(this.courseModel.id>0)//Güncelleme
    {
      this.islemTipi="Kurs Güncelle";
    }else   //Silme
    {
      this.islemTipi="Kurs Ekle";
    }

    this.courseForm = new FormGroup(
      {
        id:new FormControl(this.courseModel.id,[Validators.required]),
        name:new FormControl(this.courseModel.name,[Validators.required]),
        fees:new FormControl(this.courseModel.fees,[Validators.required]),
        durationYear:new FormControl(this.courseModel.durationYear,[Validators.required,Validators.min(0)]),
        durationMonth:new FormControl(this.courseModel.durationMonth,[Validators.required,Validators.min(0)]),
        durationWeek:new FormControl(this.courseModel.durationWeek,[Validators.required,Validators.min(0)]),
        durationDay:new FormControl(this.courseModel.durationDay,[Validators.required,Validators.min(0)]),
        kullaniciId:new FormControl(this.courseModel.kullaniciId),
        kullanici:this.userCtrl//,
        //kullaniciArama:this.userFilterCtrl
      }
    );

   // console.log(this.userForm.value);






this.userService.userListByRole(2,'-1','-1','-1',this.headers).subscribe(data=>{
  this.users = data;
  this.info = '';

       // set initial selection
       //this.userCtrl.setValue(this.users/*[10]*/);

       //console.log(this.users);

       // load the initial bank list
       this.filteredUsers.next(this.users.slice());

       if(this.courseModel.kullaniciId>0)//eğer mevcut bir öğretmeni varsa kursun ekrana yansıt
       {
        //console.log(this.users.find(x=>x.id ==this.courseModel.kullaniciId));
        this.userCtrl.setValue(this.users.find(x=>x.id ==this.courseModel.kullaniciId));
       }
       this.loading = false;
  },error=>
  {
    this.info = "Öğretmenleri getirmede bir hata meydana geldi.";
  });

  ////////////////////////////////////////////////////////////////////
     // set initial selection
     //this.userCtrl.setValue(this.users/*[10]*/);

     //console.log(this.users);

     // load the initial bank list
     //this.filteredUsers.next(this.users.slice());

     // listen for search field value changes
     this.userFilterCtrl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterUsers();
         //console.log('userFilteredCtrl.valuechanges ...');
       });


////////////////////////////////////////////////////////////////////


  }

  onsubmit(){
    //console.log(this.userCtrl.value);


    //console.log(this.courseForm.value);

    //console.log(this.courseForm.value["kullanici"]);


    //console.log(this.courseForm.value);

    /*console.log(this.courseForm.value["kullanici"]);
    console.log(this.courseForm.value["kullanici"]["id"]);
    return;*/

    this.info = "";
    //console.log(this.userForm.value);
    if(this.courseForm?.valid)
    {
      if(this.courseForm.value["kullanici"] == null)
      {
      this.courseForm.value["kullaniciId"] = -1;
      }else
      {
        this.courseForm.value["kullaniciId"] = this.courseForm.value["kullanici"]["id"];
      }

      this.loading=true;

      //console.log(this.courseForm.value["id"]);
      //
      if(this.islemTipi=="Kurs Ekle")
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
      //console.log(this.courseForm.value);
      this.courseService.courseInsert(this.courseForm.value,this.headers).subscribe(params=>{

        let adsoyad:string = this.courseForm.value["name"];
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
        this.courseModel.id = Number(params);
        this.courseModel.name = this.courseForm.value["name"];
        this.courseModel.fees = this.courseForm.value["fees"];
        this.courseModel.durationYear = this.courseForm.value["durationYear"];
        this.courseModel.durationMonth = this.courseForm.value["durationMonth"];
        this.courseModel.durationWeek = this.courseForm.value["durationWeek"];
        this.courseModel.durationDay = this.courseForm.value["durationDay"];
        if(this.courseForm.value["kullanici"] == null)
        {
          this.courseModel.kullaniciId = -1;
          this.courseModel.kullaniciAd = "";
        }else
        {
          this.courseModel.kullaniciId = this.courseForm.value["kullanici"]["id"];
          this.courseModel.kullaniciAd = this.courseForm.value["kullanici"]["name"] + " " + this.courseForm.value["kullanici"]["surName"];
         }

        this.info = adsoyad + " Başarıyla Eklenmiştir.";
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
    }

    KursGuncelle()
    {
      //console.log(this.courseForm.value);

      this.courseService.courseUpdate(this.courseForm.value,this.headers).subscribe(params=>{

        let adsoyad:string = this.courseForm.value["name"];
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
        this.courseModel.name = this.courseForm.value["name"];
        this.courseModel.fees = this.courseForm.value["fees"];
        this.courseModel.durationYear = this.courseForm.value["durationYear"];
        this.courseModel.durationMonth = this.courseForm.value["durationMonth"];
        this.courseModel.durationWeek = this.courseForm.value["durationWeek"];
        this.courseModel.durationDay = this.courseForm.value["durationDay"];
        if(this.courseForm.value["kullanici"] == null)
        {
          this.courseModel.kullaniciId = -1;
          this.courseModel.kullaniciAd = "";
        }else
        {
          this.courseModel.kullaniciId = this.courseForm.value["kullanici"]["id"];
          this.courseModel.kullaniciAd = this.courseForm.value["kullanici"]["name"] + " " + this.courseForm.value["kullanici"]["surName"];
         }

        this.info = adsoyad + " Başarıyla Güncellenmiştir.";
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
      this.filteredUsers
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

    protected filterUsers() {

      //console.log('filterBanks() tetiklendi');

      if (!this.users) {
       // console.log('this.users is null');
        return;
      }
      // get the search keyword
      let search = this.userFilterCtrl.value;
     // console.log('search=' + search);

      if (!search) {
        this.filteredUsers.next(this.users.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the banks
      this.filteredUsers.next(
        this.users.filter(user => user.name.toLowerCase().indexOf(search) > -1)
      );
    }

    ///////////////////////////////////////////////////////////////////

}


