import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Module
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// Original Module
import { FireModule } from './modules/fire.module';
import { MaterialModule } from './modules/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FireModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    RouterModule,
    FireModule,
    MaterialModule
  ]
})
export class SharedModule { }
