import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
