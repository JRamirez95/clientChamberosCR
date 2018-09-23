import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { app_routing }from "./app.routes";
import { Routes,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { RegisterComponent } from './component/register/register.component';
import { BuscarChamberosComponent } from './component/buscar-chamberos/buscar-chamberos.component';
//validations angular
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HomeComponent } from './component/home/home.component';
import { SearchChamberosComponent } from './component/search-chamberos/search-chamberos.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TrimValueAccessorModule } from 'ng-trim-value-accessor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BuscarChamberosComponent,
    HomeComponent,
    SearchChamberosComponent,
    DashboardComponent    
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    TrimValueAccessorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
