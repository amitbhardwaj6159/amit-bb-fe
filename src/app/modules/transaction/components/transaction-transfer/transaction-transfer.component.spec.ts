import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { TransactionTransferComponent } from './transaction-transfer.component';
import { Component, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { ITransaction } from '../../interfaces/transaction.interface';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction.service';
import { TransactionConstant } from '../../constants/transaction.constant';
import { TransferConfirmPopupComponent } from '../transfer-confirm-popup/transfer-confirm-popup.component';

@Component({
  selector: 'app-submit-button',
  template: '<div></div>'

})
class MockSubmitButtonComponent { }


// service mock
@Injectable()
class MockTransactionService {
  private newTransaction: Subject<ITransaction> = new Subject<ITransaction>();
  public newTransaction$ = this.newTransaction.asObservable();
  public emitNewTransaction(newTransaction: ITransaction): void {
    this.newTransaction.next(newTransaction);
  }
}


describe('TransactionTransferComponent', () => {
  let component: TransactionTransferComponent;
  let fixture: ComponentFixture<TransactionTransferComponent>;
  let mockDialogRef: any;

  const mockDialog = {
    open: (component: any, data: any) => mockDialogRef
  };

  mockDialogRef = {
    close: jasmine.createSpy('close'),
    afterClosed: () => of(true)
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule],
      declarations: [TransactionTransferComponent, MockSubmitButtonComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: mockDialog
        },
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: TransactionService,
          useClass: MockTransactionService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTransferComponent);
    component = fixture.componentInstance;
    Date.now = () => 123;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnit should initialize the form', () => {
    expect(component.transferForm).toBeDefined();
    expect(component.transferForm.controls.amount.value).toEqual('', 'amount field should be blank by default');
    expect(component.transferForm.controls.transferTo.value).toEqual('', 'transfer to field should be blank by default');
    expect(component.transferForm.controls.transferFrom.value).toContain(TransactionConstant.labels.myPersonalAccount, 'transfer from field should be prefilled by default');
  });

  it('submitForm should submit the form when field values are valid', () => {
    let amount = 5000, transferTo = 'backbase';
    const transactionService = TestBed.get(TransactionService);
    component.transferForm.controls.amount.setValue(amount);
    component.transferForm.controls.transferTo.setValue(transferTo);
    const submitFormData: ITransaction = {
      categoryCode: '#12a580',
      dates: {
        valueDate: 123
      },
      transaction: {
        amountCurrency: {
          amount: amount,
          currencyCode: "EUR"
        },
        type: "Salaries",
        creditDebitIndicator: "DBIT"
      },
      merchant: {
        name: transferTo,
        accountNumber: transferTo,
      }
    };
    mockDialogRef.afterClosed = () => of(true);
    spyOn(mockDialog, 'open').and.returnValue(mockDialogRef);
    spyOn(transactionService, 'emitNewTransaction');
    component.submitForm();
    expect(mockDialog.open).toHaveBeenCalledWith(TransferConfirmPopupComponent, { data: submitFormData });
  });

  it('After confirming submit popup, it should emit new transaction and reset form', fakeAsync(() => {
    let amount = 5000, transferTo = 'backbase';
    const transactionService = TestBed.get(TransactionService);
    component.transferForm.controls.amount.setValue(amount);
    component.transferForm.controls.transferTo.setValue(transferTo);
    const submitFormData: ITransaction = {
      categoryCode: '#12a580',
      dates: {
        valueDate: 123
      },
      transaction: {
        amountCurrency: {
          amount: amount,
          currencyCode: "EUR"
        },
        type: "Salaries",
        creditDebitIndicator: "DBIT"
      },
      merchant: {
        name: transferTo,
        accountNumber: transferTo,
      }
    };
    mockDialogRef.afterClosed = () => of(true);

    spyOn(mockDialog, 'open').and.returnValue(mockDialogRef);
    spyOn(transactionService, 'emitNewTransaction');
    component.submitForm();
    tick(1000);

    expect(transactionService.emitNewTransaction).toHaveBeenCalledWith(submitFormData);
    // check if form is reset
    expect(component.transferForm.controls.amount.value).toEqual(null, 'form amount field should be reset');
    expect(component.transferForm.controls.transferTo.value).toEqual(null, 'form transfer to field should be reset');
    expect(component.transferForm.controls.transferFrom.value).toContain(TransactionConstant.labels.myPersonalAccount, 'form transfer from field should be prefilled');

  }));
  it('Without confirmting submit popup, it should not emit new transaction and reset form', fakeAsync(() => {
    let amount = 5000, transferTo = 'backbase';
    const transactionService = TestBed.get(TransactionService);
    component.transferForm.controls.amount.setValue(amount);
    component.transferForm.controls.transferTo.setValue(transferTo);
    mockDialogRef.afterClosed = () => of(false);
    spyOn(mockDialog, 'open').and.returnValue(mockDialogRef);
    spyOn(transactionService, 'emitNewTransaction');
    component.submitForm();
    tick(1000);

    expect(transactionService.emitNewTransaction).not.toHaveBeenCalledWith();
    // Make sure form is not reset
    expect(component.transferForm.controls.amount.value).toEqual(amount, 'form amount field should not be reset');
    expect(component.transferForm.controls.transferTo.value).toEqual(transferTo, 'form transfer to field should not be reset');
    expect(component.transferForm.controls.transferFrom.value).toContain(TransactionConstant.labels.myPersonalAccount, 'form transfer from field should be prefilled');

  }));

  it('SubmitForm should not submit form if it is invalid', () => {
    const transactionService = TestBed.get(TransactionService);
    component.transferForm.controls.amount.setValue('');
    component.transferForm.controls.transferTo.setValue('');
    spyOn(transactionService, 'emitNewTransaction');
    component.submitForm();
    expect(transactionService.emitNewTransaction).not.toHaveBeenCalledWith();
  });

  it('transferTo field should fulfill required  validation', () => {
    component.transferForm.controls.transferTo.setValue('');
    component.transferForm.controls.transferTo.markAsTouched();
    expect(component.checkRequiredFieldValidation('transferTo')).toEqual(true);
    component.transferForm.controls.transferTo.setValue('backbase');
    component.transferForm.controls.transferTo.markAsTouched();
    expect(component.checkRequiredFieldValidation('transferTo')).toEqual(null);
  });

  it('amount field should fulfill required  validation', () => {
    component.transferForm.controls.amount.setValue('');
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkRequiredFieldValidation('amount')).toEqual(true);
    component.transferForm.controls.amount.setValue(5000);
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkRequiredFieldValidation('amount')).toEqual(null);

  });
  it('amount field should fulfill minimum amount  validation', () => {
    component.transferForm.controls.amount.setValue(200);
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkMinimumAmountValidation('amount')).toEqual(true);
    component.transferForm.controls.amount.setValue(501);
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkMinimumAmountValidation('amount')).toEqual(null);

  });
  it('amount field should fulfill maximum amount validation', () => {
    component.transferForm.controls.amount.setValue(6000);
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkMaximumAmountValidation('amount')).toEqual(true);
    component.transferForm.controls.amount.setValue(600);
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkMaximumAmountValidation('amount')).toEqual(null);

  });
  it('amount field should allow only positive number and number with decimal ', () => {
    component.transferForm.controls.amount.setValue('abcd');
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkPatternValidation('amount')).toEqual(true);

    component.transferForm.controls.amount.setValue(-600);
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkPatternValidation('amount')).toEqual(true);

    component.transferForm.controls.amount.setValue(545.200);
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkPatternValidation('amount')).toEqual(null);

    component.transferForm.controls.amount.setValue(600);
    component.transferForm.controls.amount.markAsTouched();
    expect(component.checkPatternValidation('amount')).toEqual(null);

  });



});
