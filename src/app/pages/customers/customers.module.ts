import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';


@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
