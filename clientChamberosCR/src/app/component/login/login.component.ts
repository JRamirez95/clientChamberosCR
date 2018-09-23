import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  login:Login;

  constructor(private userService: UserService) { 
   this.login = new Login();
 }

 ngOnInit() {
}

log(){
  this.userService.Login(this.login);
}
}
