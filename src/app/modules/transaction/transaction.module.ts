import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routiing.module';
import { TransactionService } from './services/transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { TransactionTransferComponent } from './components/transaction-transfer/transaction-transfer.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { BbUIModule } from '../bb-ui/bb-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TransactionLandingComponent } from './components/transaction-landing/transaction-landing.component';
import { TransferConfirmPopupComponent } from './components/transfer-confirm-popup/transfer-confirm-popup.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';




@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionTransferComponent,
    TransactionLandingComponent,
    TransferConfirmPopupComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    HttpClientModule,
    BbUIModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    TransactionService,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ]
})
export class TransactionModule { }
