import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MypageComponent } from './components/mypage/mypage.component';
import { UsereditComponent } from './components/useredit/useredit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MypageComponent,
    UsereditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  exports: [
    MypageComponent,
    UsereditComponent
  ]
})
export class UserModule { }
