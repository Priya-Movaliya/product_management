import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from 'src/app/common/shared.module';
import { ProductComponent } from './product.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AgGridModule,
    SharedModule
  ]
})
export class ProductModule { }
