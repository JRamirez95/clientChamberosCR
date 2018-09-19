import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

 // domain: string = 'http://localhost:3977';
 domain: string = '';
  saveUser(newUser: User) {
    return this.http.post<User>(`${this.domain}/api/register`, newUser)
      .map(res => res);
  }

  /*LoginToken(newUser: SingIn) {
    return this.http.post<UserToken>(`${this.domain}/api/login`, newUser)
      .map(user => user);
  }

  SignInUser(newUser: SingIn) {
    return this.http.post<User>(`${this.domain}/api/login`, newUser)
      .map(user => user);
  }

  userAuthentification(email,password) {
    var data = "email="+email+"&password="+password;
    console.log(data);
    return this.http.post(`${this.domain}/api/login`, data)
      .map(res => res);
  }

  getUserClaims(){
    return this.http.get(this.domain+'/api/login');
  }

}*/
}
