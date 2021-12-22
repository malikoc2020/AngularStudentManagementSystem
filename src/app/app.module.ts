import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from "ngx-pagination";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


//import { DatePipe } from '@angular/common';
//import {MatDatepickerModule} from '@angular/material/datepicker';
//import {MatMomentDateModule} from '@angular/material/core';
// import {MatNativeDateModule,MatMomentDateModule} from '@angular/material/datepicker';


//import {MatDialogModule, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
//import { MatIconModule } from "@angular/material/icon";

//import {OnInit,AfterViewInit, Component, ViewChild} from '@angular/core';
//import {MatPaginator} from '@angular/material/paginator';
//import {MatTableDataSource} from '@angular/material/table';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';
import { HomeAdminComponent } from './Pages/Admin/home-admin/home-admin.component';
import { AdminNavComponent } from './Components/Navs/admin-nav/admin-nav.component';
import { AdminLayoutComponent } from './Layouts/admin-layout/admin-layout.component';
import { TeacherListComponent } from './Pages/Admin/teacher-list/teacher-list.component';
import { UserNewComponent } from './Pages/Admin/user-new/user-new.component';
import { NewUserPopupComponent } from './Components/Popups/new-user-popup/new-user-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnasayfaPopapComponent } from './Pages/Admin/anasayfa-popap/anasayfa-popap.component';
import { EditUserPopupComponent } from './Components/Popups/edit-user-popup/edit-user-popup.component';
import { TeacherList2Component } from './Pages/Admin/teacher-list2/teacher-list2.component';
import { CourseListComponent } from './Pages/Admin/course-list/course-list.component';
import { CorusePopupComponent } from './Components/Popups/coruse-popup/coruse-popup.component';
import { SingleSelectionComponent } from './Components/Test/single-selection/single-selection.component';
import { AdminListComponent } from './Pages/Admin/admin-list/admin-list.component';
import { StudentListComponent } from './Pages/Admin/student-list/student-list.component';
import { EditTeachersPopupComponent } from './Components/Popups/edit-teachers-popup/edit-teachers-popup.component';
import { StudentCoursePopupComponent } from './Components/Popups/student-course-popup/student-course-popup.component';
import { DatePipe } from '@angular/common';
import { TeacherAnasayfaComponent } from './Pages/Teacher/teacher-anasayfa/teacher-anasayfa.component';
import { StudentAnasayfaComponent } from './Pages/Student/student-anasayfa/student-anasayfa.component';
import { StudentLayoutComponent } from './Layouts/student-layout/student-layout.component';
import { TeacherLayoutComponent } from './Layouts/teacher-layout/teacher-layout.component';
import { TeacherNavComponent } from './Components/Navs/teacher-nav/teacher-nav.component';
import { StudentNavComponent } from './Components/Navs/student-nav/student-nav.component';
import { CourseStudentsPopupComponent } from './Components/Popups/course-students-popup/course-students-popup.component';
import { NewCourseApplicationComponent } from './Pages/Student/new-course-application/new-course-application.component';
import { NotificationPopupComponent } from './Components/Popups/notification-popup/notification-popup.component';
import { StudentNotificationPopupComponent } from './Components/Popups/student-notification-popup/student-notification-popup.component';
import { ResetPasswordComponent } from './Login/reset-password/reset-password.component';
//import { MatNativeDateModule } from '@angular/material/core/datetime';
//import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeAdminComponent,
    AdminNavComponent,
    AdminLayoutComponent,
    TeacherListComponent,
    UserNewComponent,
    NewUserPopupComponent,
    AnasayfaPopapComponent,
    EditUserPopupComponent,
    TeacherList2Component,
    CourseListComponent,
    CorusePopupComponent,
    SingleSelectionComponent,
    AdminListComponent,
    StudentListComponent,
    EditTeachersPopupComponent,
    StudentCoursePopupComponent,
    TeacherAnasayfaComponent,
    StudentAnasayfaComponent,
    StudentLayoutComponent,
    TeacherLayoutComponent,
    TeacherNavComponent,
    StudentNavComponent,
    CourseStudentsPopupComponent,
    NewCourseApplicationComponent,
    NotificationPopupComponent,
    StudentNotificationPopupComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,FormsModule,
    MatButtonModule,MatInputModule,
    MatPaginatorModule,MatTableModule,
    MatSelectModule,
    NgbModule,
    MatIconModule,
    NgxMatSelectSearchModule,MatFormFieldModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule//,
    //DatePipe
    //MaterialModule,            // <----- this module will be deprecated in the future version.
    //MatDatepickerModule,        // <----- import(must)
    //MatNativeDateModule,        // <----- import for date formating(optional)
    //MatMomentDateModule         // <----- import for date formating adapted to more locales(optional)




      // MatIconModule,MatDialogModule, MatDialog, MatDialogConfig, MatDialogRef
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]//,
  //entryComponents:[NewUserPopupComponent]
})
export class AppModule { }
