import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/User';
import { Router } from '@angular/router';
import {ProfessionService} from '../../services/profession/profession.service';
import {Profession} from "../../models/Profession";


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [UserService,ProfessionService]
})
export class UpdateUserComponent implements OnInit {
    user = new User();
    usu = new User();
    professions: Profession[];
  profession = new Profession();
  constructor(private userServices: UserService, private router:Router,private porfessionServices: ProfessionService) {
    this.getUser();
    this.getProfessions();
   }
 

  ngOnInit() {
  }

  getProfessions(){
    //var ut = localStorage.getItem("userToken");
        this.porfessionServices.getProfessions()
        .subscribe(professions => {
        this.professions = professions;
        console.log(this.profession);
        });
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

  editUser(event) {
    event.preventDefault();
     var userToken = localStorage.getItem("token");
        var u = JSON.parse(sessionStorage.getItem("user"));
        var userEdit = new User;
        userEdit._id = u.user._id;
        userEdit.name = this.user.name;
        userEdit.surnames = this.user.surnames;
        userEdit.professionId = this.user.professionId;
        userEdit.gender = this.user.gender;
        userEdit.email = this.user.email;
        userEdit.phone = this.user.phone;
        userEdit.birthdate = this.usu.birthdate;
        userEdit.password = this.usu.password;
        userEdit.latitud = this.usu.latitud;
        userEdit.longitud = this.usu.longitud;
        userEdit.approvalstatus = this.usu.approvalstatus;

        this.userServices.editUser(userEdit,userEdit._id, userToken)
            .subscribe(user => {
                user =  user;
                alert("Edit exitoso");
            });
}

deleteUser(event) {
    event.preventDefault();
    
    
        var userToken = localStorage.getItem("userToken");
        var id = this.user._id;

        
        this.userServices.deleteUser(id, userToken)
            .subscribe(user => {
                console.log(this.user);
                user =  user;
                alert("Delete exitoso");
            });
}

}
