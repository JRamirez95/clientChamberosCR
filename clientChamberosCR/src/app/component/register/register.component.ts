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
        this.user.latitud = String(this.lat);
        this.user.longitud = String(this.lng);
        this.user.approvalstatus = "true";
        this.user.professionId = "";
  
        
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
 
   




