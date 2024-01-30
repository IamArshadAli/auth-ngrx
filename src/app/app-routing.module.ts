import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { authGuard } from './guard/auth.guard';
import { UsersListComponent } from './component/users-list/users-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard]},
  { path: 'users', component: UsersListComponent, canActivate: [authGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
