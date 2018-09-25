import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserToken } from '../../models/UserToken';
import {User} from '../../models/User';
import {Profession} from '../../models/Profession';


@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  private domain = 'https://chamberos-api.herokuapp.com';
   //domain: string = 'http://localhost:3001';
  constructor(private http: HttpClient) {}

 /* getProfessions(token: string) {
    return this.http.get<Profession[]>(`${this.domain}/api/profession` ,{headers: { Authorization: token}})
      .map(res => res);
  }*/

  getProfessions() {
    return this.http.get<Profession[]>(`${this.domain}/api/professions`)
      .map(res => res);
  }
}
