import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { CategoryComponent } from './core/components/category/category.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { DetailComponent } from './feature/detail/detail.component';
import { SignupComponent } from './users/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { MypageComponent } from './users/mypage/mypage.component';
import { environment } from '../environments/environment';
// Angular Module
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewuserComponent } from './users/newuser/newuser.component';
import { UsereditComponent } from './users/useredit/useredit.component';
// AngularFire
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { LoginComponent } from './users/login/login.component';
// AngularMaterial
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
