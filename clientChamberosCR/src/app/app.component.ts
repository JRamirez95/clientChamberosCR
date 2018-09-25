import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientChamberosCR';
  online = false;

  constructor() { 
    this.isLog();
  }

  ngOnInit() {
    this.isLog();
  }

  logout(){
   localStorage.setItem("token","");
   sessionStorage.clear();
  window.location.href = "../login";
  }

  isLog(){
    if(localStorage.getItem('token')==""){
      this.online= true;
    }
  }

}
