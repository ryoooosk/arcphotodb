import { NgModule } from '@angular/core';
// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './feature/components/dashboard/dashboard.component';
import { DetailComponent } from './feature/components/detail/detail.component';
import { SignupComponent } from './users/components/signup/signup.component';
import { MypageComponent } from './users/components/mypage/mypage.component';
import { LoginComponent } from './users/components/login/login.component';
import { NewuserComponent } from './users/components/newuser/newuser.component';
import { UsereditComponent } from './users/components/useredit/useredit.component';
// Original Module
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { FireModule } from './shared/fire.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    SignupComponent,
    MypageComponent,
    NewuserComponent,
    UsereditComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    FireModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
