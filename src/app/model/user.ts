import { Role } from "./role";

export interface User {
  id:number;
  name:string;
  surname:string;
  username:string;
  password:string;
  email:string;
  role:Role;
}
