import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './http-interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LoggerComponent } from './logger/logger.component';
import { WalletComponent } from './wallet/wallet.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { LandingComponent } from './landing/landing.component';
import { BsDatepickerModule,BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { WalletinfoSmallComponent } from './walletinfo-small/walletinfo-small.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoggerComponent,
    WalletComponent,
    ExpensesComponent,
    LandingComponent,
    WalletinfoSmallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [BsDatepickerConfig,httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
