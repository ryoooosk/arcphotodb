import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './feature/components/dashboard/dashboard.component';
import { LoginComponent } from './users/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserGuard } from './core/guards/user.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { UploadComponent } from './feature/components/upload/upload.component';
import { PictureComponent } from './feature/components/picture/picture.component';


const Route = [
  { path: '', component: DashboardComponent },
  { path: 'signup', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent },
  { path: 'picture/:id', component: PictureComponent },
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
