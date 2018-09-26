import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { UserToken } from "../../models/UserToken";
import { User } from "../../models/User";
import { Login } from "../../models/login";

@Injectable({
  providedIn: "root"
})
export class UserService {
  //domain: string = 'http://localhost:3001';
  private domain = "https://chamberos-api.herokuapp.com";

  constructor(private http: HttpClient) {}

  saveUser(newUser: User) {
    return this.http
      .post<User>(`${this.domain}/api/users`, newUser)
      .map(res => res);
  }

  /*getUsers(token: string) {
    return this.http.get<User[]>(`${this.domain}/api/users` ,{headers: { Authorization: token}})
      .map(res => res);
  }*/

  editUser(userEdit: User, id: string, token: string) {
    return this.http
      .put<User>(`${this.domain}/api/users/${id}`, userEdit, {
        headers: { Authorization: token }
      })
      .map(res => res);
  }

  deleteUser(id: string, token: string) {
    return this.http
      .delete<User>(`${this.domain}/api/users/${id}`, {
        headers: { Authorization: token }
      })
      .map(res => res);
  }
  getUserByProfession(profession: string, token: string) {
    return this.http
      .get<User[]>(`${this.domain}/api/users`, {
        headers: { Authorization: token }
      })
      .map(res => res);
  }
  getUserById(id: string, token: string) {
    const url = `${this.domain}/api/users/${id}`;
    return this.http
      .get<User>(url, {
        headers: { Authorization: token }
      })
      .map(res => res);
  }
  // login routes
  LoginToken(newUser: Login) {
    const url = `${this.domain}/api/login/`;
    return this.http.post<UserToken>(url, newUser).map(user => user);
  }

  LoginUser(newUser: Login) {
    const url = `${this.domain}/api/login/`;
    return this.http.post<User>(url, newUser).map(user => user);
  }
  getUserByProfessionSearcht(
    profession: string,
    latitud: number,
    longitud: number,
    radius: string
  ) {
    return this.http
      .get<User[]>(
        `${
          this.domain
        }/api/users/professions/${profession}/${latitud}/${longitud}/${radius}`
      )
      .map(res => res);
  }

  getUserByIdSearch(id: string) {
    const url = `${this.domain}/api/users/search/${id}`;
    return this.http.get<User>(url).map(res => res);
  }
}
