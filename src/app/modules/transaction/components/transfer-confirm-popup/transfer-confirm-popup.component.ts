import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITransaction, ILabels } from '../../interfaces/transaction.interface';
import { TransactionConstant } from '../../constants/transaction.constant';

@Component({
  selector: 'app-transfer-confirm-popup',
  templateUrl: './transfer-confirm-popup.component.html',
  styleUrls: ['./transfer-confirm-popup.component.scss']
})
export class TransferConfirmPopupComponent implements OnInit {

  transaction: ITransaction;
  labels: ILabels = TransactionConstant.labels;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: ITransaction,
  private matDailogRef: MatDialogRef<TransferConfirmPopupComponent>) { }

  ngOnInit(): void {
    this.transaction = this.dialogData;
    
  }
  closePopup(success: boolean): void {
    this.matDailogRef.close(success);
  }

}
