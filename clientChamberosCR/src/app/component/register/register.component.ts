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

  
  @ViewChild('gmap') gmapElement: any;
  //google maps
  map: google.maps.Map;
  isTracking = false;
  currentLat: any;
  currentLong: any;
  marker: google.maps.Marker;


  user = new User();

  constructor (private userServices: UserService, private router:Router){

  }


  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }


  registerUser(event) {
    event.preventDefault();
   // if (this.validationPassword(this.user) == false) {

        this.user.latitud = "10.185158";
        this.user.longitud = "-84.390989";
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
