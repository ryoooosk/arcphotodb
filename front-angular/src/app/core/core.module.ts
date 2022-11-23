import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { FireModule } from '../shared/modules/fire.module';
import { MaterialModule } from '../shared/modules/material.module';


@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    CategoryComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
