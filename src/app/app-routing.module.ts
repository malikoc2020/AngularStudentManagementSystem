import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './Layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './Login/login/login.component';
import { AnasayfaPopapComponent } from './Pages/Admin/anasayfa-popap/anasayfa-popap.component';
import { CourseListComponent } from './Pages/Admin/course-list/course-list.component';
import { HomeAdminComponent } from './Pages/Admin/home-admin/home-admin.component';
import { StudentListComponent } from './Pages/Admin/student-list/student-list.component';
import { TeacherListComponent } from './Pages/Admin/teacher-list/teacher-list.component';
import { TeacherList2Component } from './Pages/Admin/teacher-list2/teacher-list2.component';
import { UserNewComponent } from './Pages/Admin/user-new/user-new.component';
import { AdminListComponent } from './Pages/Admin/admin-list/admin-list.component';
import { TeacherAnasayfaComponent } from './Pages/Teacher/teacher-anasayfa/teacher-anasayfa.component';
import { StudentAnasayfaComponent } from './Pages/Student/student-anasayfa/student-anasayfa.component';
import { TeacherLayoutComponent } from './Layouts/teacher-layout/teacher-layout.component';
import { StudentLayoutComponent } from './Layouts/student-layout/student-layout.component';
import { NewCourseApplicationComponent } from './Pages/Student/new-course-application/new-course-application.component';
import { AdminGuardService } from './Services/Guards/admin-guard.service';
import { TeacherGuardService } from './Services/Guards/teacher-guard.service';
import { StudentGuardService } from './Services/Guards/student-guard.service';
import { ResetPasswordComponent } from './Login/reset-password/reset-password.component';
import { BasicGuardService } from './Services/Guards/basic-guard.service';

const routes: Routes = [
  {
    //wwww.x.com
    path:"",
    component:LoginComponent
  },
  {
    //wwww.x.com/admin
    path:"admin",
    component:AdminLayoutComponent,
    canActivate:[AdminGuardService],
    children:[
      {
        path:"",
        component:HomeAdminComponent
      },
      {
        path:"teachers",
        component:TeacherList2Component
      },
      {
        path:"courses",
        component:CourseListComponent
      },
      {
        path:"students",
        component:StudentListComponent
      },
      {
        path:"admins",
        component:AdminListComponent
      }
    ]
  },
  {
    //wwww.x.com/teacher
    path:"teacher",
    component:TeacherLayoutComponent,
    canActivate:[TeacherGuardService],
    children:[
      {
        path:"",
        component:TeacherAnasayfaComponent
      }
    ]
  },
  {
    //wwww.x.com/student
    path:"student",
    component:StudentLayoutComponent,
    canActivate:[StudentGuardService],
    children:[
      {
        path:"",
        component:StudentAnasayfaComponent
      },
      {
        path:"newcourse",
        component:NewCourseApplicationComponent
      }
    ]
  },
  {
    path:"resetPassword",
    component:ResetPasswordComponent,
    canActivate:[BasicGuardService]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
