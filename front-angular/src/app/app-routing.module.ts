import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './feature/components/detail/detail.component';
import { SignupComponent } from './users/components/signup/signup.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './feature/components/dashboard/dashboard.component';
import { NewuserComponent } from './users/components/newuser/newuser.component';
import { LoginComponent } from './users/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserGuard } from './core/guards/user.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';


const Route = [
  { path: '', component: DashboardComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'newuser', component: NewuserComponent, canActivate: [AuthGuard] },
  { path: 'detail', component: DetailComponent },
  { path: 'mypage', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [UserGuard] },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(Route),
  ], exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
