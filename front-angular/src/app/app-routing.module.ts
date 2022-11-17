import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './feature/detail/detail.component';
import { SignupComponent } from './users/signup/signup.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { MypageComponent } from './feature/mypage/mypage.component';
import { NewuserComponent } from './users/newuser/newuser.component';
import { UsereditComponent } from './feature/useredit/useredit.component';
import { LoginComponent } from './users/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserGuard } from './core/guards/user.guard';


const Route = [
  { path: '', component: DashboardComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'newuser', component: NewuserComponent, canActivate: [AuthGuard] },
  { path: 'detail', component: DetailComponent },
  { path: 'mypage', component: MypageComponent, canActivate: [UserGuard] },
  { path: 'useredit', component: UsereditComponent },
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
