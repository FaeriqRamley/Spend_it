import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoggerComponent } from './components/logger/logger.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ExpensesComponent } from './components/expenses/expenses.component';

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
