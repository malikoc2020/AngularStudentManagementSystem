import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/Models/User/user';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-edit-user-popup',
  templateUrl: './edit-user-popup.component.html',
  styleUrls: ['./edit-user-popup.component.css']
})
export class EditUserPopupComponent implements OnInit {
  headers!:HttpHeaders;
  userModel: User = new User;


  userForm!: FormGroup;
  loading:boolean =false;
  success:boolean =false;
  info:string="";
  rolId:number = -1;
  guncellemeTipi:string = "";
  guncellemeTipiButton:string = "";


  constructor(public modal:NgbActiveModal,private userService:UserService,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + token);

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
}
