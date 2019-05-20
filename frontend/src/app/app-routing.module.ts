import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DiveLogComponent } from './dive-log/dive-log.component';
import { AddDiveComponent } from './add-dive/add-dive.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDiverComponent } from './add-diver/add-diver.component';
import { AuthGuard } from './authguard';

const routes: Routes = [
  // No specified path (example.com/) goes to HomeComponent
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dive-log',
    component: DiveLogComponent,
    // canActivate: [AuthGuard] // <---- connected Route with guard
  },
  {
    path: 'add-dive',
    component: AddDiveComponent,
  },
  {
    path: 'add-diver',
    component: AddDiverComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard] // <---- connected Route with guard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
