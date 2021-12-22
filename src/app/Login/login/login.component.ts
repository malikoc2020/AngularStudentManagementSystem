import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserControlResponse } from 'src/app/Models/User/user-control-response';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading:boolean =false;
  success:boolean =false;
  info:string="";
  userControlRes: UserControlResponse = new UserControlResponse;
  //@Input() error: string ="";
  //@Output() submitEM = new EventEmitter();

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {

    localStorage.setItem('currentUserId', "");
    localStorage.setItem('currentUserEmail', "");
    localStorage.setItem('currentUserRolId', "" );
    localStorage.setItem('currentUserName', "" );
    localStorage.setItem('currentUserSurname', "" );
    localStorage.setItem('currentUserToken', "" );

    this.loginForm = new FormGroup(
      {
        password:new FormControl("",Validators.required),
        email:new FormControl("",[Validators.required,Validators.email]),
      }
    );
  }


  onsubmit(){
    //console.log("hahaha");
    //console.log(this.contactForm.valid);
    this.info = "";
    if(this.loginForm?.valid)
    {
      this.loading=true;
      this.userService.userControlMethod(this.loginForm.value).subscribe(params=>{

        this.userControlRes = params;

        if(this.userControlRes.id<1)
        {
          this.success=true;
          this.info = "Kullanıcı adi yada Şifre yanlış. Lütfen bilgilerinizi tekrar ederek tekrar deneyiniz.";
          this.loading=false;
        }else
         {//Başarılı giriş. Personeli ilgili sayfasına yönlendermeliyiz.
          this.loginForm?.reset();
          this.success=true;
          this.loading=false;
          this.info = "";

            // console.log(this.userControlRes);
          localStorage.setItem('currentUserId', this.userControlRes.id.toString() );
          localStorage.setItem('currentUserEmail', this.userControlRes.email.toString() );
          localStorage.setItem('currentUserRolId', this.userControlRes.rolId.toString() );
          localStorage.setItem('currentUserName', this.userControlRes.name.toString() );
          localStorage.setItem('currentUserSurname', this.userControlRes.surName.toString() );
          localStorage.setItem('currentUserToken', this.userControlRes.token.accessToken.toString() );

          if(this.userControlRes.sifreDegismeliMi == 1)
          {
            this.router.navigateByUrl('/resetPassword');
          }else if(this.userControlRes.rolId ==1 )//Admin
          {
            this.router.navigateByUrl('/admin');
          }else if(this.userControlRes.rolId == 2)//Teacher
          {
            this.router.navigateByUrl('/teacher');
          }else if(this.userControlRes.rolId == 3)//Student
          {
            this.router.navigateByUrl('/student');
          }else//Hata durumu. Rolü belli değil.
          {
            this.info = "Rolünüzle ilgili hata alınmıştır. Lütfen sistem yetkiliniz ile iletişime geçiniz.";
          }
         }
      },error=>
      {
        this.success=false;
        //this.contactForm?.reset();
        this.info = "Bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.";
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
          return name + ' alanı boş bırakılamaz.';
        }
        if(errorname == "email")
        {
          return name + ' alanı formatı yanlış.';
        }
        if(errorname == "minlength")
        {
          return name + ' alanı en az 5 karakter olmalıdır.';
        }
      }
    }
    //herhangi bir validationa takılmamış.
    return '';
  }

  get loginControls()
  {
    return this.loginForm.controls;
  }

}
