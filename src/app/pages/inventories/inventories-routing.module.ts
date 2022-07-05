import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';

const routes: Routes = [
  {
    path: "",
    component: InventoryListComponent
  },
  {
    path: "form",
    component: InventoryFormComponent
  },
  {
    path: "form/:id",
    component: InventoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoriesRoutingModule { }
