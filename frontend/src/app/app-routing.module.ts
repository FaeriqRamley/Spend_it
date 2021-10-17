import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoggerComponent } from './logger/logger.component';
import { WalletComponent } from './wallet/wallet.component';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [
  {path:'landing', component: LandingComponent},
  {path:'logger', component: LoggerComponent},
  {path:'wallet', component: WalletComponent},
  {path:'expenses', component: ExpensesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
