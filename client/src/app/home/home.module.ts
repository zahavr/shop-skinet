import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {ProductDetailsComponent} from '../shop/product-details/product-details.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
