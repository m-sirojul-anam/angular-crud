import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { RouteGuard } from './shared/guard/route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/signin',
    pathMatch: "full",
  },

  {
    path: "home",
    canActivate: [RouteGuard],
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "pages",
    // canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
  // {
  //   path: "**",
  //   redirectTo: "auth/signin",
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
