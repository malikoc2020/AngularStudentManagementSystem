import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentCourse } from 'src/app/Models/Course/student-course';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentCourceServiceService {

  apiURL:string=environment.baseUrl + "/StudentCourses";
  constructor(private httpClient:HttpClient) { }




  GetStudentCourses(studentId:number,headers: HttpHeaders)
  {
      return this.httpClient.get<StudentCourse[]>(this.apiURL + '/GetStudentCourses/'+studentId, { headers: headers });
  }

  studentCourseInsert(u:StudentCourse,headers: HttpHeaders)
  {
    //başarılı ise eklenen kaydın id sini döndürmektedir.
      return this.httpClient.post(this.apiURL + '/insertStudentCourse',u, { headers: headers });
  }

  studentCourseUpdate(u:StudentCourse,headers: HttpHeaders)
  {
      return this.httpClient.post(this.apiURL + '/updateStudentCourse',u, { headers: headers });
  }

  studentCourseDelete(id:number,headers: HttpHeaders)
  {
      return this.httpClient.get(this.apiURL + '/deleteStudentCourse/'+id, { headers: headers });
  }

}
