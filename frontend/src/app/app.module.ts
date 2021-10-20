import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './http-interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoggerComponent } from './components/logger/logger.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { LandingComponent } from './components/landing/landing.component';
import { BsDatepickerModule,BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { WalletinfoSmallComponent } from './components/walletinfo-small/walletinfo-small.component';
import { WalletinfoLargeComponent } from './components/walletinfo-large/walletinfo-large.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SavingGoalsComponent } from './components/saving-goals/saving-goals.component';
import { CreateModalComponent } from './components/create-modal/create-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SavingGoalItemComponent } from './components/saving-goal-item/saving-goal-item.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BudgetComponent } from './components/budget/budget.component';
import { BudgetCreateModalComponent } from './components/budget-create-modal/budget-create-modal.component';
import { BudgetExpensesModalComponent } from './components/budget-expenses-modal/budget-expenses-modal.component';
import { BudgetItemComponent } from './components/budget-item/budget-item.component';
import { BudgetEditModalComponent } from './components/budget-edit-modal/budget-edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoggerComponent,
    WalletComponent,
    ExpensesComponent,
    LandingComponent,
    WalletinfoSmallComponent,
    WalletinfoLargeComponent,
    SavingGoalsComponent,
    CreateModalComponent,
    SavingGoalItemComponent,
    BudgetComponent,
    BudgetCreateModalComponent,
    BudgetExpensesModalComponent,
    BudgetItemComponent,
    BudgetEditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    MatTabsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [BsDatepickerConfig,httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
