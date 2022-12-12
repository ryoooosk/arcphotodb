import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MypageComponent } from './components/mypage/mypage.component';
import { UsereditComponent } from './components/useredit/useredit.component';
import { SharedModule } from '../shared/shared.module';
import { UserpictureComponent } from './components/userpicture/userpicture.component';


@NgModule({
  declarations: [
    MypageComponent,
    UsereditComponent,
    UserpictureComponent
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
