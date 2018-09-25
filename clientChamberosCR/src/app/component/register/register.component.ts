import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'google-maps'
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  


  user = new User();
  lat: number;
  lng: number;

  constructor (private userServices: UserService, private router:Router){
    this.getLocation();
  }


  ngOnInit() {
  }

  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
  
  registerUser(event) {
    event.preventDefault();
   // if (this.validationPassword(this.user) == false) {

        this.user.latitud = String(this.lat);
        this.user.longitud = String(this.lng);
        this.user.approvalstatus = "true";
        this.user.professionId = "";

        console.log(this.user);
        this.userServices.saveUser(this.user)
            .subscribe(user => {
                console.log(user);
                this.user = user;
                
                alert("Su registro se realizo exitosamente!");
                this.router.navigate(['/login'])
            });
          }// else {
           // alert("registro fallido, intentolo nuevamente");
         // }
   // return;
}

/* validationPassword = function(user){
   if (user.password != user.repeatPassword) {
      alert("Las contrasenas no coinciden");
         return true;
                                              }
          return false;
                                    }
}*/
