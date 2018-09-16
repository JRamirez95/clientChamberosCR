import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

const app_routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent}
    
];
  
  export const app_routing = RouterModule.forRoot(app_routes);