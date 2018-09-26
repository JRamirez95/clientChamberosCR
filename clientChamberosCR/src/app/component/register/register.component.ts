import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'google-maps'
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/User';

import { Router } from '@angular/router';
import {ProfessionService} from '../../services/profession/profession.service';
import {Profession} from "../../models/Profession";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService,ProfessionService ]
})
export class RegisterComponent implements OnInit {

  

  professions: Profession[];
  profession = new Profession();
  user = new User();
  
  lat: number;
  lng: number;


  constructor (private userServices: UserService,private porfessionServices: ProfessionService, private router:Router){
    this.getLocation();
    this.getProfessions();
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

  getProfessions(){
    //var ut = localStorage.getItem("userToken");
        this.porfessionServices.getProfessions()
        .subscribe(professions => {
        this.professions = professions;
        });
      }
  
  registerUser(event) {
    event.preventDefault();
        this.user.latitud = String(this.lat);
        this.user.longitud = String(this.lng);
        this.user.approvalstatus = "true";

        console.log(this.user);
        if(this.validationGPS(this.user,) == false){
        
        this.userServices.saveUser(this.user)
            .subscribe(user => {
                console.log(user);
                this.user = user;
                
                alert("Su registro se realizo exitosamente!");
                this.router.navigate(['/login'])
            });
            
          }
          } 

          validationGPS = function(user, ){
           
              console.log(user.latitud,user.longitud)
           if (!user.latitud || !user.longitud) {
              alert("Estimado usuario queremos advertirle que no tiene la ubicación activada de su dispositivo o computadora. Por favor activar gps para que su ubicación como chambero la pueden ver los usuarios que requieren de sus servicios. !");
                 return true;
                                                      }
                  return false;
                }
 }
 
   




