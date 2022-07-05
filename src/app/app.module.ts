import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/components/shared.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth/auth-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
