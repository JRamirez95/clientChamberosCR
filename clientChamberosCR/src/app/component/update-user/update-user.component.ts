import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [UserService]
})
export class UpdateUserComponent implements OnInit {

  constructor(private userServices: UserService, private router:Router) { }
  user = new User();

  ngOnInit() {
  }

  /*getUser(){
      
    var userToken = localStorage.getItem("userToken");
        this.userServices.(userToken)
        .subscribe(user => {
        console.log(user);
        this.user = user;
        });
      }*/

  editUser(event) {
    event.preventDefault();
        var id = this.user._id;
        var userToken = localStorage.getItem("userToken");
        this.userServices.editUser(this.user,id, userToken)
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
