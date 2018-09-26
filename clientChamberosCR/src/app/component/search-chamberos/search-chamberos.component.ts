import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../models/User";
import { UserService } from "../../services/user/user.service";
import {ProfessionService} from '../../services/profession/profession.service';
import {Profession} from "../../models/Profession";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Navigation } from "selenium-webdriver";

@Component({
  selector: "app-search-chamberos",
  templateUrl: "./search-chamberos.component.html",
  styleUrls: ["./search-chamberos.component.css"]
})
export class SearchChamberosComponent implements OnInit {
  users: any = [];
  professions: Profession[];
  radius: number = 5000;
  lat: number;
  lng: number;
  km: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private porfessionServices: ProfessionService
  ) {}

  ngOnInit() {
    this.getUserLocation();
    this.getProfessions();
    
  }

  private getUserLocation() {
    /// locate the user
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


  getUsersByPrefession(profession:string, radius:string): void {
    this.userService.getUserByProfessionSearcht(profession, this.lat, this.lng, radius)
    .subscribe(users => {
    this.users = users;
    });
  }

  getUserById(id: string): void {
    this.userService.getUserByIdSearch(id).subscribe({
      next: response => {
        this.buildUserDetails(response);
      },
      error: error => {
        alert(error);
      }
    });
  }

  
  buildUserDetails(user:User) {
    document.getElementById("fullname").innerHTML = `Nombre: ${user.name} ${user.surnames}`;
    document.getElementById("email").innerHTML = `Email: ${user.email}`;
    document.getElementById("birthdate").innerHTML = `Fecha Nacimiento: ${user.birthdate}`;
    document.getElementById("gender").innerHTML = `Genero: ${user.gender}`;
    document.getElementById("phone").innerHTML = `Teléfono: ${user.phone}`;    
  }
  search(){
    var radius = (<HTMLSelectElement>document.getElementById('sltRadius'));
    var profession = (<HTMLSelectElement>document.getElementById('sltProfession'));
    if(radius.value === undefined || radius.value === null || profession.value === undefined || profession.value === null || profession.value === 'null'){
      alert("Internal Error, verifique el radio, profesion esten corrrectos");
      return;
    }

    
    this.radius = Number(`${radius.value}000`);
    document.getElementById("filtro").innerHTML = `Busqueda: ${profession.options[profession.selectedIndex].text} a un radio de ${radius.options[radius.selectedIndex].text}`;
    this.getUsersByPrefession(profession.value, radius.value);
  }
}