import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserControlResponse } from 'src/app/Models/User/user-control-response';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  headers!:HttpHeaders;
  userId:number =0;
    userEmail:string = "";
    rolId:number = 0;


  loginForm!: FormGroup;
  loading:boolean =false;
  success:boolean =false;
  info:string="";
  //userControlRes: UserControlResponse = new UserControlResponse;
  //@Input() error: string ="";
  //@Output() submitEM = new EventEmitter();

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {

    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    this.userId = Number(localStorage.getItem("currentUserId"));
    this.userEmail = String(localStorage.getItem("currentUserEmail"));
    this.rolId = Number(localStorage.getItem("currentUserRolId"));

    this.loginForm = new FormGroup(
      {
        id:new FormControl(this.userId,Validators.required),
        email:new FormControl(this.userEmail,Validators.required),

        password:new FormControl("",Validators.required),
        newpassword:new FormControl("",[Validators.required]),
        newpassword1:new FormControl("",[Validators.required]),
      }
    );
  }


  onsubmit(){
    //console.log("hahaha");
    //console.log(this.contactForm.valid);
    this.info = "";
    this.success=true;
    if(this.loginForm?.valid)
    {

      if(this.loginForm.value["newpassword"] !=this.loginForm.value["newpassword1"]  )
      {
        this.success = false;
        this.info="L??tfen yeni ??ifrenizi kontrol ediniz. Yeni ??ifre alan?? ile Yeni ??ifre (Tekrar) alan?? ayn?? olmal??d??r."
        return false;
      }
      this.info = "";
      this.success=true;

      this.loading=true;
      this.userService.userChangePassword(this.loginForm.value,this.headers).subscribe(params=>{

        //this.userControlRes = params;

        if(confirm("??ifreniz ba??ar??yla g??ncellenmi??tir. Ana sayfaya gitmek ister misiniz?")) {

              if(this.rolId ==1 )//Admin
              {
                this.router.navigateByUrl('/admin');
              }else if(this.rolId == 2)//Teacher
              {
                this.router.navigateByUrl('/teacher');
              }else if(this.rolId == 3)//Student
              {
                this.router.navigateByUrl('/student');
              }else//Hata durumu. Rol?? belli de??il.
              {
                //this.info = "Rol??n??zle ilgili hata al??nm????t??r. L??tfen sistemden ????k???? yap??p tekrar giriniz yada sistem yetkiliniz ile ileti??ime ge??iniz.";
                this.router.navigateByUrl('/');
              }
        }else
        {
          this.router.navigateByUrl('/');
        }


      },error=>
      {
        this.success=false;
        //this.contactForm?.reset();
        this.info = "Bir hata meydana geldi. L??ften bilgilerinizi kontrol edip tekrar deneyiniz.";
        //return false;
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
          return name + ' alan?? bo?? b??rak??lamaz.';
        }
        if(errorname == "email")
        {
          return name + ' alan?? format?? yanl????.';
        }
        if(errorname == "minlength")
        {
          return name + ' alan?? en az 5 karakter olmal??d??r.';
        }
      }
    }
    //herhangi bir validationa tak??lmam????.
    return '';
  }

  get loginControls()
  {
    return this.loginForm.controls;
  }

}
