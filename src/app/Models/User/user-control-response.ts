import { Token } from "./token";

export class UserControlResponse {
  id:number=-1;
  name:string = "";
  surName:string = "";
  rolId:number=-1;
  email:string = "";
  hataliGirisSayisi:number=-1;
  sifreDegismeliMi:number = -1;
  token:Token = new Token;
}
