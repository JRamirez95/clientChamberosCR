import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import{HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../services/user/user.service';
import {User}from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:Login;
  token: string;
  isLoginError : boolean = false;
  user  = new User();
  constructor(private userService: UserService) { 
   this.login = new Login();
   this.token = "";
 

  }

  ngOnInit() {
  }

  log(){
    this.login.gethash = true;
    this.userService.LoginToken(this.login).subscribe(res => {
      this.token = res.token;
     localStorage.setItem('token', ''+res.token);
     this.loginUser(this.login);
      this.ngOnInit();
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
      alert("User or password Invalid")
    });
  }

  loginUser(log:Login){
    log.gethash = false;
    
    this.userService.LoginUser(log).subscribe(res => {
      this.user = res;
     sessionStorage.setItem('user', JSON.stringify(this.user));
    
     window.location.href= "../dashboard";
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
      alert("User or password Invalid")
    });
  }
  }
