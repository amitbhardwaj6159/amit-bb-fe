import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TransactionConstant } from '../../constants/transaction.constant';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransferConfirmPopupComponent } from '../transfer-confirm-popup/transfer-confirm-popup.component';
import {  ITransaction, ILabels } from '../../interfaces/transaction.interface';
import { TransactionService } from '../../services/transaction.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-transaction-transfer',
  templateUrl: './transaction-transfer.component.html',
  styleUrls: ['./transaction-transfer.component.scss']
})
export class TransactionTransferComponent implements OnInit, OnDestroy {
  transferForm: FormGroup;
  myCurrentBalance: number = 5824.76;
  labels: ILabels = TransactionConstant.labels;
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog,
    private matDailogRef: MatDialogRef<TransferConfirmPopupComponent>,
    private transactionService: TransactionService) { }

  public ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.transferForm = this.formBuilder.group({
      'transferFrom': [{ value: '', disabled: true }, Validators.required],
      'transferTo': ['', [Validators.required]],
      'amount': ['', [Validators.required, Validators.pattern(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),
        this.minimumBalanceValidator.bind(this)]]
    });
    this.autoFillForm();
  }

  private minimumBalanceValidator(control: AbstractControl): ValidationErrors | null {

      if (this.myCurrentBalance < -500 || (this.myCurrentBalance - control.value) < -500 ) {
        return { minimumBalance: true }
      } else {
        return null;
      }
  }

  private autoFillForm(): void {
    this.transferForm!!.get('transferFrom')!!.setValue(this.labels.myPersonalAccount + this.myCurrentBalance);
  }

  public submitForm(): void {
    if (this.transferForm.valid) {
      const submitFormData: ITransaction = {
        categoryCode: '#12a580',
        dates: {
          valueDate: Date.now()
        },
        transaction: {
          amountCurrency: {
            amount: this.transferForm!!.get('amount')!!.value,
            currencyCode: "EUR"
          },
          type: "Salaries",
          creditDebitIndicator: "DBIT"
        },
        merchant: {
          name: this.transferForm!!.get('transferTo')!!.value,
          accountNumber: this.transferForm!!.get('transferTo')!!.value,
        }
      };
      this.matDailogRef = this.matDialog.open(TransferConfirmPopupComponent, { data: submitFormData });
      this.confirmSubmission(submitFormData);
    } else {
      this.transferForm!!.get('amount')!!.markAsTouched();
      this.transferForm!!.get('transferTo')!!.markAsTouched();
    }
  }

  private confirmSubmission(submitFormData: ITransaction): void {
    this.matDailogRef.afterClosed().pipe(takeUntil(this.unsubscribe))
    .subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.submitTransactionToBackend(submitFormData);
      }
    })
  }

  private submitTransactionToBackend(submitFormData: ITransaction): void {
    // TODO: submit transaction to backend and on success update it on UI
    this.myCurrentBalance -= submitFormData.transaction.amountCurrency.amount;
    this.transactionService.emitNewTransaction(submitFormData);
    // reset form state
    this.transferForm.reset();
    this.autoFillForm();

  }

  /** methods to show different validation messages */
  public checkRequiredFieldValidation(controlName: string): boolean | null {
    return this.transferForm!!.get(controlName)!!.errors
      && this.transferForm!!.get(controlName)!!.errors!!.required
      && this.transferForm!!.get(controlName)!!.touched;
  }
  public checkPatternValidation(controlName: string): boolean | null {
    return this.transferForm!!.get(controlName)!!.errors
      && this.transferForm!!.get(controlName)!!.errors!!.pattern
      && this.transferForm!!.get(controlName)!!.touched;
  }
  public checkMinimumBalanceValidation(controlName: string): boolean | null {
    return this.transferForm!!.get(controlName)!!.errors
      && this.transferForm!!.get(controlName)!!.errors!!.minimumBalance
      && this.transferForm!!.get(controlName)!!.touched;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
