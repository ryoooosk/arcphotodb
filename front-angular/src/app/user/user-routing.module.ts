import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MypageComponent } from './components/mypage/mypage.component';
import { UsereditComponent } from './components/useredit/useredit.component';
import { UserGuard } from '../core/guards/user.guard';

const routes: Routes = [
  // { path: 'mypage', component: MypageComponent, canActivate: [UserGuard] },
  // { path: 'useredit', component: UsereditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
