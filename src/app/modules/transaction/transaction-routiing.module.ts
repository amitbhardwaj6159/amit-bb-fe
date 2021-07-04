
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionLandingComponent } from './components/transaction-landing/transaction-landing.component';
const routes: Routes = [
  {
    path: '',
    component: TransactionLandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
