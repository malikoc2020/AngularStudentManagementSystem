import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/Models/User/user';
import { UserService } from 'src/app/Services/User/user.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { NewUserPopupComponent } from 'src/app/Components/Popups/new-user-popup/new-user-popup.component';
import {MatIconModule} from '@angular/material/icon';
//import { EditTeachersPopupComponent } from 'src/app/Components/Popups/edit-teachers-popup/edit-teachers-popup.component';
import { EditUserPopupComponent } from 'src/app/Components/Popups/edit-user-popup/edit-user-popup.component';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-teacher-list2',
  templateUrl: './teacher-list2.component.html',
  styleUrls: ['./teacher-list2.component.css']
})
export class TeacherList2Component implements OnInit {
  headers!:HttpHeaders;
userList:Array<User> = [];

  teacherListForm!: FormGroup;
  loading:boolean =false;
  success:boolean =true;
  info:string ="";
  rolId:number = 2;


  displayedColumns: string[] = [/*'id'*/'No', 'name', 'surName', 'email','hataliGirisSayisi','educationDetail','personalDetail','qualification','kursları', 'Guncelle/Sil'];
  dataSource:MatTableDataSource<User> =new MatTableDataSource<User>([]);;
  //teachers:User[]=[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private userService:UserService, private router:Router, private modalService:NgbModal) { }

  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + token);


    this.teacherListForm = new FormGroup(
      {
        name:new FormControl(""),
        surName:new FormControl(""),
        email:new FormControl("")
      }
    );

    //this.setUsersList();
  }

  createItem()
  {
     let userModel:User = new User;
     userModel.rolId=this.rolId;
     userModel.hataliGirisSayisi = 0;

    const ref =   this.modalService.open(NewUserPopupComponent);
    ref.componentInstance.userModel = userModel;

    ref.result.then((yes)=>{
        console.log("Ok click");
        //this.userList[0].hataliGirisSayisi = 10;
        //console.log(userModel.hataliGirisSayisi);
        //console.log(ref.componentInstance.userModel.hataliGirisSayisi);

        //userModel.hataliGirisSayisi = ref.componentInstance.userModel.hataliGirisSayisi;
        this.userList.push(userModel);
        this.dataSource = new MatTableDataSource<User>(this.userList);
        this.dataSource.paginator=this.paginator;
    },
    (cancel)=>{
        console.log("Cancel click");
    })
  }

  editItem(userModel:User)
  {
    //this.router.navigateByUrl('');
    const ref =   this.modalService.open(EditUserPopupComponent);
    ref.componentInstance.userModel = userModel;

    ref.result.then((yes)=>{
        console.log("Ok click");
        //this.userList[0].hataliGirisSayisi = 10;
        //console.log(userModel.hataliGirisSayisi);
        //console.log(ref.componentInstance.userModel.hataliGirisSayisi);

        //userModel.hataliGirisSayisi = ref.componentInstance.userModel.hataliGirisSayisi;
    },
    (cancel)=>{
        console.log("Cancel click");
    })
  }

  deleteItem(user:User)
  {
    // if (user.courses.length > 0)
    // {
    //   return false;
    // }

    if(confirm(user.name + " " + user.surName + " isimli kaydı silmek istediğinizden emin misiniz?")) {




    this.userService.userDelete(user.id,this.headers).subscribe(x=>
      {
        //this.setUsersList()
        //this.onsubmit();
        //this.userList.find(x=>x.id ==user.id)
        //console.log(user);
        //console.log(this.userList.indexOf(user));


        this.userList.splice(this.userList.indexOf(user),1);
        this.dataSource = new MatTableDataSource<User>(this.userList);
        this.dataSource.paginator=this.paginator;


        //console.log(this.userList.indexOf(user));


        this.info = "";
      },error =>{

          //this.loading=false;
          //this.success=false;
          this.info = "Bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.";
      }
      );

    }
  }

  // private setUsersList(){
  //   this.userService.userListByRole(-1,'','','').subscribe(x=>{
  //     this.userList = x;
  //   })
  // }





  onsubmit(){
    this.loading=true;
    this.info ="";
    var frm:any = this.teacherListForm.value;
    //console.log(frm);
    //console.log(frm['name']);
    //console.log(frm['surname']);
    //console.log(frm['email']);
    let name:string = frm['name'];
    let surname:string=frm['surName'];
    let email:string=frm['email'];

    if(name=='')
      name = '-1';
      if(surname=='')
      surname = '-1';
      if(email=='')
      email = '-1';

    this.userService.userListByRole(this.rolId,name,surname,email,this.headers).subscribe(data=>{
      //console.log(data);

        this.userList = data;
        this.dataSource = new MatTableDataSource<User>(data);
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

}

