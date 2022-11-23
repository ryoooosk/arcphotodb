import { NgModule } from '@angular/core';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { CategoryComponent } from './core/components/category/category.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { DetailComponent } from './feature/detail/detail.component';
import { SignupComponent } from './users/signup/signup.component';
import { MypageComponent } from './users/mypage/mypage.component';
import { LoginComponent } from './users/login/login.component';
import { NewuserComponent } from './users/newuser/newuser.component';
import { UsereditComponent } from './users/useredit/useredit.component';
// Original Module
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { FireModule } from './shared/fire.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
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
