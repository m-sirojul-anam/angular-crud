import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StoreFormComponent } from './components/store-form/store-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StoreListComponent,
    StoreFormComponent
  ],
  imports: [
    CommonModule,
    StoresRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    StoresRoutingModule,
    StoreListComponent,
    StoreFormComponent
  ]
})
export class StoresModule { }
