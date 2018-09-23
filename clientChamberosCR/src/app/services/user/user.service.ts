import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


import {User} from '../../models/User';
import { Login } from '../../models/login';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //domain: string = 'http://localhost:3001';
 domain: string = 'https://chamberos-api.herokuapp.com';
  saveUser(newUser: User) {
    return this.http.post<User>(`${this.domain}/api/users`, newUser)
      .map(res => res);
  }

  /*getUsers(token: string) {
    return this.http.get<User[]>(`${this.domain}/api/users` ,{headers: { Authorization: token}})
      .map(res => res);
  }*/

  editUser(userEdit: User,id:string, token: string) {
    return this.http.put<User>(`${this.domain}/api/users/`+id, userEdit,{headers: { Authorization: token}})
      .map(res => res);
  }

  deleteUser(id:string, token: string) {
    return this.http.delete<User>(`${this.domain}/api/users/`+id,{headers: { Authorization: token}})
      .map(res => res);
  }

  Login(newUser: Login) {
   
    return this.http.post<User>(`${this.domain}/api/users`, newUser) .map(user => user);
  }
}
