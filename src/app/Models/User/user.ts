import { Course } from "../Course/course";
import { StudentCourse } from "../Course/student-course";

export class User {
  id:number = -1;
  name:string ='';
  surName :string ='';
  rolId:number = -1;
  email:string ='';
  password:string ='';
  hataliGirisSayisi :number = -1;
  educationDetail :string ='';
  personalDetail:string ='';
  qualification :string ='';
  dateCreated:string ='';
  courses: Course[] = [];
  studentCourses: StudentCourse[] = [];
}
