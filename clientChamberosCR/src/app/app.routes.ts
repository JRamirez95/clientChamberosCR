import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { BuscarChamberosComponent } from './component/buscar-chamberos/buscar-chamberos.component';
import { HomeComponent } from './component/home/home.component';
import { SearchChamberosComponent } from './component/search-chamberos/search-chamberos.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const app_routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'buscar-chamberos', component: BuscarChamberosComponent},
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'search', component: SearchChamberosComponent},
  {path:'dashboard', component: DashboardComponent}
    
];
  
  export const app_routing = RouterModule.forRoot(app_routes);