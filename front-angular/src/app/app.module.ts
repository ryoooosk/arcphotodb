import { NgModule } from '@angular/core';
// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './feature/components/dashboard/dashboard.component';
import { DetailComponent } from './feature/components/detail/detail.component';
import { SignupComponent } from './users/components/signup/signup.component';
import { LoginComponent } from './users/components/login/login.component';
import { NewuserComponent } from './users/components/newuser/newuser.component';
// Original Module
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    SignupComponent,
    NewuserComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
