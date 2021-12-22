import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/Models/Course/course';
import { Notification } from 'src/app/Models/Course/notification';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiURL:string=environment.baseUrl + "/Course";
  constructor(private httpClient:HttpClient) { }

  courseList(teacherId:number,name:string,headers: HttpHeaders)
  {
      return this.httpClient.get<Course[]>(this.apiURL + '/GetCourses/'+teacherId+"/"+name, { headers: headers });
  }

  // courseListByTeacherId(teacherId:number,name:string)
  // {
  //     return this.httpClient.get<Course[]>(this.apiURL + '/GetCoursesByTeacher/'+teacherId+"/"+name);
  // }


  courseInsert(u:Course,headers: HttpHeaders)
  {
    //başarılı ise eklenen kaydın id sini döndürmektedir.
      return this.httpClient.post(this.apiURL + '/insertCourse',u, { headers: headers });
  }

  courseUpdate(u:Course,headers: HttpHeaders)
  {
      return this.httpClient.post(this.apiURL + '/updateCourse',u, { headers: headers });
  }

  courseDelete(id:number,headers: HttpHeaders)
  {
      return this.httpClient.get(this.apiURL + '/deleteCourse/'+id, { headers: headers });
  }

  notificationInsert(u:Notification,headers: HttpHeaders)
  {
    //başarılı ise eklenen kaydın id sini döndürmektedir.
      return this.httpClient.post(this.apiURL + '/insertNotification',u, { headers: headers });
  }

  notificationUpdate(u:Notification,headers: HttpHeaders)
  {
      return this.httpClient.post(this.apiURL + '/updateNotification',u, { headers: headers });
  }

  notificationDelete(id:number,headers: HttpHeaders)
  {
      return this.httpClient.get(this.apiURL + '/deleteNotification/'+id, { headers: headers });
  }
}
