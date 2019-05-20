import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DiveLogComponent } from './dive-log/dive-log.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './authguard';
import { RegisterComponent } from './register/register.component';
import { AddDiveComponent } from './add-dive/add-dive.component';
import { AddDiverComponent } from './add-diver/add-diver.component';
import { DiveLogChartComponent } from './dive-log-chart/dive-log-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { DiverChartComponent } from './diver-chart/diver-chart.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DiveLogComponent,
    NavComponent,
    DashboardComponent,
    AddDiveComponent,
    AddDiverComponent,
    DiveLogChartComponent,
    DiverChartComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MDBBootstrapModule.forRoot(),
    NgxChartsModule
  ],
  providers: [
    Title,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
