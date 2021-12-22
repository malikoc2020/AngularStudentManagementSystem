import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/User/user';
import { UserService } from 'src/app/Services/User/user.service';

// interface Food {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  headers!:HttpHeaders;

  userForm!: FormGroup;
  loading:boolean =false;
  success:boolean =false;
  info:string="";
  user: User = new User;
  rolId:number = -1;

  selected:string= 'option2';

  // @ViewChild(FormGroupDirective)
  // formGroupDirective!: FormGroupDirective;

  // rols:Rol [] = [
  //   {id: -1, ad: '-Seçiniz-'},
  //   {id: 1, ad: 'Yönetici'},
  // {id: 2, ad: 'Öğretmen'},
  // {id: 3, ad: 'Öğrenci'}];

  constructor(private userService:UserService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + token);

    this.userForm = new FormGroup(
      {
        email:new FormControl("",[Validators.required,Validators.email]),
        name:new FormControl("",[Validators.required]),
        surName:new FormControl("",[Validators.required]),
        rolId:new FormControl(""/*,[Validators.required,Validators.min(1), Validators.max(3)]*/),
        educationDetail:new FormControl(""),
        personalDetail:new FormControl(""),
        qualification:new FormControl("")
      }
    );


    this.route.url.subscribe(params=>
      {

        if(this.route.snapshot.paramMap.get("rolId"))
        {
          this.rolId=Number(this.route.snapshot.paramMap.get("rolId"));

          // if(this.rolId == '1')
          // {
          //     this.rols = [    {id: 1, ad: 'Yönetici'}];
          // }
          // else if(this.rolId=='2')
          // {
          //   this.rols = [{   id: 2, ad: 'Öğretmen'}];
          // }else if(this.rolId =='3')
          // {
          //   this.rols = [{ id: 3, ad:'Öğrenci'}];
          // }
        }
        //this.searchText = String(this.route.snapshot.queryParamMap.get("s"));
      });



  }

  onsubmit(){

    this.info = "";
    console.log(this.userForm.value);
    if(this.userForm?.valid)
    {
      this.loading=true;
      this.userForm.value["rolId"]=this.rolId;//rolid burada url den alındığı hali ile ekleniyor.
      this.userService.userInsert(this.userForm.value,this.headers).subscribe(params=>{

        let adsoyad:string = this.userForm.value["name"] + " " + this.userForm.value["surName"];
          this.success=true;

           this.userForm.reset({
              'name': '',
              'surName': '',
              'email': '',
              'educationDetail': '',
              'personalDetail': '',
              'qualification': '',
              'rolId':''
             });

          //  Object.keys(this.userForm.controls).forEach(key => {
          //   this.userForm.controls[key].setErrors(null)
          // });


          //this.userForm.reset();
          // setTimeout(() =>
          // this.formGroupDirective.resetForm(), 0);
          // setTimeout(() =>
          // this.info="",2000);
          this.info = adsoyad + " başarıyla sisteme eklenmiştir.";
          this.loading=false;
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

}
