import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Module
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
  ]
})
export class CoreModule { }
