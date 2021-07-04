import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISubmitTransactionPayload, ITransaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-transfer-confirm-popup',
  templateUrl: './transfer-confirm-popup.component.html',
  styleUrls: ['./transfer-confirm-popup.component.scss']
})
export class TransferConfirmPopupComponent implements OnInit {

  transaction: ITransaction;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private matDailogRef: MatDialogRef<TransferConfirmPopupComponent>) { }

  ngOnInit(): void {
    this.transaction = this.dialogData.data;
    
  }
  closePopup(success: boolean): void {
    this.matDailogRef.close(success);
  }

}
