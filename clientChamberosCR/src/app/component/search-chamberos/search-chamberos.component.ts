import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../models/User";
import { UserService } from "../../services/user/user.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Navigation } from "selenium-webdriver";

@Component({
  selector: "app-search-chamberos",
  templateUrl: "./search-chamberos.component.html",
  styleUrls: ["./search-chamberos.component.css"]
})
export class SearchChamberosComponent implements OnInit {
  users: any = [];
  radius: number = 5000;
  lat: number;
  lng: number;
  km: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserLocation();
  }

  private getUserLocation() {
    this.radius = Number.parseFloat(
      `${this.route.snapshot.paramMap.get("km")}000`
    );
    this.km = Number.parseFloat(`${this.route.snapshot.paramMap.get("km")}`);
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getUsersByPrefession();
      });
    }
  }

  // getlocation(){
  //   var location = this.route.snapshot.paramMap.get('location');
  //   this.lat = Number.parseFloat(location.split(',')[0]);
  //   this.lng = Number.parseFloat(location.split(',')[1]);
  //   this.radius =  Number.parseFloat(`${this.route.snapshot.paramMap.get('km')}000`);
  //   this.km =  Number.parseFloat(`${this.route.snapshot.paramMap.get('km')}`);
  //  }
  getDistance(lat1, lon1, lat2, lon2) {
    const radio = 6371,
      dLat = this.deg2rad(lat2 - lat1),
      dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return radio * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  getUsersByPrefession(): void {
    this.userService.getUserByProfession('all','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmE3YjcwM2Q2ZWI5NTAwMDQzYWI0N2MiLCJuYW1lIjoiQ3Jpc3RpYW5vIiwiZW1haWwiOiJjcmlzQGdtYWlsLmNvbSIsImlhdCI6MTUzNzcxODI2M30.6YExCXKX_f3VFq04QrWk2_oji1Co3ULI_ihdXvIM47A').subscribe({
      next: response => {
        this.filterUser(response);
      },
      error: error => {
        alert(error);
      }
    });
  }

  getUserById(id: string): void {
    this.userService.getUserById(id, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmE3YjcwM2Q2ZWI5NTAwMDQzYWI0N2MiLCJuYW1lIjoiQ3Jpc3RpYW5vIiwiZW1haWwiOiJjcmlzQGdtYWlsLmNvbSIsImlhdCI6MTUzNzcxODI2M30.6YExCXKX_f3VFq04QrWk2_oji1Co3ULI_ihdXvIM47A').subscribe({
      next: response => {
        this.buildUserDetails(response);
      },
      error: error => {
        alert(error);
      }
    });
  }

  filterUser(users: User[]) {

    console.log(this.lat);
    console.log(this.lng);
  
    for (let user of users) {
      let dtc = this.getDistance(
        this.lat,
        this.lng,
        user.latitud,
        user.longitud
      );
      if (dtc) {
        this.users.push({ user: user, km: Number(dtc.toFixed(2)) });
      }
    }
    //order items by km
    this.users.sort(function(obj1, obj2) {
      return obj1.km - obj2.km;
    });
    console.log(this.users); 
  }
  buildUserDetails(user:User) {
    document.getElementById("fullname").innerHTML = `Nombre: ${user.name} ${user.surnames}`;
    document.getElementById("email").innerHTML = `Email: ${user.email}`;
    document.getElementById("birthdate").innerHTML = `Fecha Nacimiento: ${user.birthdate}`;
    document.getElementById("gender").innerHTML = `Genero: ${user.gender}`;
    document.getElementById("phone").innerHTML = `Teléfono: ${user.phone}`;
    
  }
}