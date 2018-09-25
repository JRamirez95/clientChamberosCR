import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {
  user = new User();
  usu = new User();


  constructor(private userServices: UserService, private router:Router) {
    this.getUser();
    
   }

  ngOnInit() {
  }


  getUser(){
    var userToken = localStorage.getItem("token");
    var u = JSON.parse(sessionStorage.getItem("user"));
    this.userServices.getUserById(u.user._id ,userToken)
    .subscribe(user => {
        user =  user;
        this.usu = user;
       
    });
  }
  
}
