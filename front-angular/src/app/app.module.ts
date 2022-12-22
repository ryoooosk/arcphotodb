import { NgModule } from '@angular/core';
// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './feature/components/dashboard/dashboard.component';
// Original Module
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadComponent } from './feature/components/upload/upload.component';
import { PictureComponent } from './feature/components/picture/picture.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UploadComponent,
    PictureComponent
  ],
  imports: [
    // BrowserModule(~)はapp.moduleで一度だけのloadとしないとエラー出る
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UserModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
