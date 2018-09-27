import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../models/User";
import { UserService } from "../../services/user/user.service";
import {ProfessionService} from '../../services/profession/profession.service';
import {Profession} from "../../models/Profession";
import {Mail} from "../../models/Mail";
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
        if(!this.validatePosition(position.coords.latitude, position.coords.longitude)){
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }else{
        alert('No se pudo obtener tu ubicación');
      }
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

  sendEmail(mail:any): void {
    this.userService.sendMail(mail).subscribe({
      next: response => {
        alert('Se envio el correo');
      },
      error: error => {
        alert(error);
      },
      complete:()=>{
      }
    });
  }
  
  buildUserDetails(user:User) {
    document.getElementById("fullname").innerHTML = `Nombre: ${user.name} ${user.surnames}`;
    document.getElementById("email").innerHTML = `Email: ${user.email}`;
    document.getElementById("gender").innerHTML = `Genero: ${user.gender}`;
    document.getElementById("phone").innerHTML = `Teléfono: ${user.phone}`;   
    (<HTMLInputElement> document.getElementById("btn-contact")).disabled = false; 
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
  openModal(){

    var fullname = (<HTMLInputElement>document.getElementById('txtFullname')).value;
    var email = (<HTMLInputElement>document.getElementById('txtEmail')).value;
    var phone = (<HTMLInputElement>document.getElementById('txtPhone')).value;
    var to = document.getElementById('email').innerHTML;
    if(this.validateSendEmail(fullname, email, phone, to)){
      alert("Verifique los datos antes de contactar al chamber@");
    }else{
        this.sendEmail(this.builMail(to,fullname, email,phone));
    }
  }

  validateSendEmail(fullname:string, email:string, phone:string, to:string){
      if(fullname === undefined || fullname === null || fullname.length === 0){
        return true;
      }
      if(email === undefined || email === null || email.length === 0){
        return true;
      }
      if(phone === undefined || phone === null || phone.length === 0){
        return true;
      }
      if(to === undefined || to === null || to.length === 0){
        return true;
      }
      return false;
  }
  
  validatePosition(lat, ln){
    if(lat === undefined || lat === null || lat.length === 0){
      return true;
    }
    if(ln === undefined || ln === null || ln.length === 0){
      return true;
    }
    return false;
}

builMail(to:string, fullname: string, email:string, phone:string){
  let mail = new Mail();
  mail.to = to;
  mail.fullname = fullname;
  mail.email = email;
  mail.phone = phone;
  return mail;
}

clearModal(){
  var fullname = (<HTMLInputElement>document.getElementById('txtFullname')).value = "";
  var email = (<HTMLInputElement>document.getElementById('txtEmail')).value = "" ;
  var phone = (<HTMLInputElement>document.getElementById('txtPhone')).value = "";
}
}