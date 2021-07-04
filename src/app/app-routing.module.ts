import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateLayoutComponent } from './modules/shared/components/private-layout/private-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transaction',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: 'transaction',
        loadChildren: () => import('./modules/transaction/transaction.module').then(
          module => module.TransactionModule
        )
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
