import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { TransferConfirmPopupComponent } from './transfer-confirm-popup.component';
import { of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITransaction } from '../../interfaces/transaction.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'mat-icon',
  template: '<div></div>'
})
class MockMatIconComponent {}

describe('TransferConfirmPopupComponent', () => {
  let component: TransferConfirmPopupComponent;
  let fixture: ComponentFixture<TransferConfirmPopupComponent>;

  let mockDialogRef = {
    close: jasmine.createSpy('close'),
    afterClosed: () => of(true)
  };

  const transaction: ITransaction =  {
    categoryCode: '#12a580',
    dates: {
      valueDate: 123
    },
    transaction: {
      amountCurrency: {
        amount: 500,
        currencyCode: 'EUR'
      },
      type: 'Salaries',
      creditDebitIndicator: 'DBIT'
    },
    merchant: {
      name: 'backbase',
      accountNumber: '13222',
    }
  };
  const mockDialogData = {
    data: transaction
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferConfirmPopupComponent, MockMatIconComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: transaction },

        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnit should initialize transaction', () => {
    expect(component.transaction).toEqual(transaction);
  });

  it('closePopup should close the popup with confirmation as yes', () => {
    const matDailogRef = TestBed.get(MatDialogRef);
    component.closePopup(true);
    expect(matDailogRef.close).toHaveBeenCalledWith(true);
  });

  it('closePopup should close the popup with confirmation as no', () => {
    const matDailogRef = TestBed.get(MatDialogRef);
    component.closePopup(false);
    expect(matDailogRef.close).toHaveBeenCalledWith(false);
  });
});
