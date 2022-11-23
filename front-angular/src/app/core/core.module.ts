import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Module
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    CategoryComponent,
  ],
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
    HeaderComponent,
    CategoryComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
