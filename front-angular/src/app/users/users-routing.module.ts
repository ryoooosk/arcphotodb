import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { NewuserComponent } from './components/newuser/newuser.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'newuser', component: NewuserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
