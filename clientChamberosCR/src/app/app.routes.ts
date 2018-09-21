import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { BuscarChamberosComponent } from './component/buscar-chamberos/buscar-chamberos.component';
import { HomeComponent } from './component/home/home.component';

const app_routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'buscar-chamberos', component: BuscarChamberosComponent},
  {path:'home', component: HomeComponent}
    
];
  
  export const app_routing = RouterModule.forRoot(app_routes);