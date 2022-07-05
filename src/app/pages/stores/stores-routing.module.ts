import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreFormComponent } from './components/store-form/store-form.component';
import { StoreListComponent } from './components/store-list/store-list.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: StoreListComponent
      }
    ]
  },
  {
    path: "form",
    children: [
      {
        path: "",
        component: StoreFormComponent
      },
      {
        path: ":id",
        component: StoreFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
