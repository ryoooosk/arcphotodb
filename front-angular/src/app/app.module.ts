import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { CategoryComponent } from './core/components/category/category.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { DetailComponent } from './feature/detail/detail.component';
import { SignupComponent } from './users/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { MypageComponent } from './feature/mypage/mypage.component';
import { environment } from '../environments/environment';
// Angular Module
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewuserComponent } from './users/newuser/newuser.component';
import { UsereditComponent } from './feature/useredit/useredit.component';
// AngularFire
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { LoginComponent } from './users/login/login.component';

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
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
