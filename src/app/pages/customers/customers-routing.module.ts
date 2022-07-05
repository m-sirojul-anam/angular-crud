import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

const routes: Routes = [
  {
    path: "",
    component: CustomerListComponent
  },
  {
    path: "form",
    component: CustomerFormComponent
  },
  {
    path: "form/:id",
    component: CustomerFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
