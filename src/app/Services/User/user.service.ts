import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserControl } from '../../Models/User/user-control';
import { UserControlResponse } from 'src/app/Models/User/user-control-response';
import { User } from 'src/app/Models/User/user';
import { ChangePassword } from 'src/app/Models/User/change-password';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL:string=environment.baseUrl + "/User";
  constructor(private httpClient:HttpClient) { }

  userControlMethod(userControl:UserControl)
  {
      return this.httpClient.post<UserControlResponse>(this.apiURL + '/UserControl',userControl);
  }

  userChangePassword(userControl:ChangePassword,headers: HttpHeaders)
  {
      return this.httpClient.post<UserControlResponse>(this.apiURL + '/UserChangePassword',userControl, { headers: headers });
  }

  userListByRole(rolid:number, name:string, surname:string, email:string,headers: HttpHeaders)
  {
      return this.httpClient.get<User[]>(this.apiURL + '/GetUsers/'+rolid+'/'+name+'/'+surname+'/'+email, { headers: headers });
  }

  getCourseStudents(courseId:number,headers: HttpHeaders)
  {
      return this.httpClient.get<User[]>(this.apiURL + '/GetCourseStudents/'+courseId, { headers: headers });
  }

  userInsert(u:User,headers: HttpHeaders)
  {
    //başarılı ise eklenen kaydın id sini döndürmektedir.
      return this.httpClient.post(this.apiURL + '/insertUser',u, { headers: headers });
  }

  userUpdate(u:User,headers: HttpHeaders)
  {
      return this.httpClient.post(this.apiURL + '/updateUser',u, { headers: headers });
  }

  userDelete(id:number,headers: HttpHeaders)
  {
      return this.httpClient.get(this.apiURL + '/deleteUser/'+id, { headers: headers });
  }

}
