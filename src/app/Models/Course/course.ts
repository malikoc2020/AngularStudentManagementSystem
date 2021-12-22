import { Notification } from "./notification";

export class Course {
  id :number = 0;
  name:string ='';
  fees:number = 0;
  durationYear:number = 0;
  durationMonth :number = 0;
  durationWeek :number = 0;
  durationDay :number = 0;
  kullaniciId:number = 0;//kursun öğretmeni
  kullaniciAd:string = '';//kursun öğretmeni
  dateCreated:string ='';
  notifications: Notification[] = [];
}

