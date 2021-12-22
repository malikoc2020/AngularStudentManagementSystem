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
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  headers!:HttpHeaders;
userList:Array<User> = [];

  studentListForm!: FormGroup;
  loading:boolean =false;
  success:boolean =true;
  info:string ="";
  rolId:number = 1;


  displayedColumns: string[] = [/*'id'*/'No', 'name', 'surName', 'email','hataliGirisSayisi','educationDetail','personalDetail','qualification', 'Guncelle/Sil'];
  dataSource:MatTableDataSource<User> =new MatTableDataSource<User>([]);;
  //teachers:User[]=[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private userService:UserService, private router:Router, private modalService:NgbModal) { }

  ngOnInit(): void {
    let token:string = String(localStorage.getItem('currentUserToken'));
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + token);

    this.studentListForm = new FormGroup(
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
    const ref =   this.modalService.open(EditUserPopupComponent);
    ref.componentInstance.userModel = userModel;

    ref.result.then((yes)=>{
        console.log("Ok click");
    },
    (cancel)=>{
        console.log("Cancel click");
    })
  }

  deleteItem(user:User)
  {

    if(confirm(user.name + " " + user.surName + " isimli kaydı silmek istediğinizden emin misiniz?")) {

    this.userService.userDelete(user.id,this.headers).subscribe(x=>
      {
        this.userList.splice(this.userList.indexOf(user),1);
        this.dataSource = new MatTableDataSource<User>(this.userList);
        this.dataSource.paginator=this.paginator;

        this.info = "";
      },error =>{
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
    var frm:any = this.studentListForm.value;
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
  }
}
