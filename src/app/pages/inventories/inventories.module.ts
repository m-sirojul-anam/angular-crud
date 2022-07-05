import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoriesRoutingModule } from './inventories-routing.module';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventoryFormComponent,
    InventoryListComponent
  ],
  imports: [
    CommonModule,
    InventoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InventoriesModule { }
