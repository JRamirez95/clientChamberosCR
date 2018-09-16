import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { app_routing }from "./app.routes";
import { Routes,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { RegisterComponent } from './component/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent    
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
