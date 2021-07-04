import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListComponent } from './transaction-list.component';
import { Component, Injectable } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction.service';
import { ITransactionList, ITransaction } from '../../interfaces/transaction.interface';
import { of, Observable, Subject } from 'rxjs';
const transactionList: ITransactionList = {
  data: [
    {
      categoryCode: "#12a580",
      dates: {
        valueDate: 1600493600000
      },
      transaction: {
        amountCurrency: {
          amount: 5000,
          currencyCode: 'EUR'
        },
        type: 'Salaries',
        creditDebitIndicator: 'CRDT'
      },
      merchant: {
        name: 'Backbase',
        accountNumber: 'SI64397745065188826'
      }
    },
    {
      categoryCode: '#12a580',
      dates: {
        valueDate: 1600387200000
      },
      transaction: {
        amountCurrency: {
          amount: 82.02,
          currencyCode: 'EUR'
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT'
      },
      merchant: {
        name: 'The Tea Lounge',
        accountNumber: 'SI64397745065188826'
      }
    
    }
  ]
};

@Component({
  selector: 'app-filter',
  template: '<div></div>',
})
export class MockFilterComponent {
}
@Component({
  selector: 'app-transaction-item',
  template: '<div></div>',
})
export class MockTransactionItemComponent {
}

@Injectable()
class MockTransactionService {
  public getTransactionList(): Observable<ITransactionList> {
    return of(transactionList) as Observable<ITransactionList>;
  }
  private newTransaction: Subject<ITransaction> = new Subject<ITransaction>();
  public newTransaction$ = this.newTransaction.asObservable(); 
  public emitNewTransaction(newTransaction: ITransaction): void {
    this.newTransaction.next(newTransaction);
}
}


describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatIconModule, MatInputModule, MatDialogModule],
      declarations: [ TransactionListComponent, MockFilterComponent, MockTransactionItemComponent ],
      providers: [
        {
          provide: TransactionService,
          useClass: MockTransactionService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    component.transactionList = transactionList.data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Should initialize transction list', () => {
    expect(component.transactionList).toEqual(transactionList.data);
  });

  it('filterTransactionList should filter the transaction list by text provided', () => {
    const event: any = {
      target: {
       value: 'Tea'
      }
    };
    component.filterTransactionList(event);
    expect(component.transactionList.length).toEqual(1);
  });
  it('filterTransactionList should show the all transaction when no filter is applied', () => {
    const event: any = {
      target: {
       value: ''
      }
    };
    component.filterTransactionList(event);
    expect(component.transactionList.length).toEqual(2);
  });

  it('newTransaction$ observable should add new transaction to list when no filter is applied', () => {
    const transactionService: TransactionService = TestBed.get(TransactionService);
    const newTransaction = {
      categoryCode: "#12a580",
      dates: {
        valueDate: 1600493600000
      },
      transaction: {
        amountCurrency: {
          amount: 5000,
          currencyCode: 'EUR'
        },
        type: 'Salaries',
        creditDebitIndicator: 'CRDT'
      },
      merchant: {
        name: 'New Marchant',
        accountNumber: 'SI64397745065188826'
      }
    };
    // transactionService.emitNewTransaction(newTransaction)
    expect(component.transactionList.length).toEqual(3);
  });

  // it('newTransaction$ observable should add new transaction to list when filter is applied', () => {
  //   const transactionService: TransactionService = TestBed.get(TransactionService);
  //   const newTransaction = {
  //     categoryCode: "#12a580",
  //     dates: {
  //       valueDate: 1600493600000
  //     },
  //     transaction: {
  //       amountCurrency: {
  //         amount: 5000,
  //         currencyCode: 'EUR'
  //       },
  //       type: 'Salaries',
  //       creditDebitIndicator: 'CRDT'
  //     },
  //     merchant: {
  //       name: 'New Marchant',
  //       accountNumber: 'SI64397745065188826'
  //     }
  //   };
  //   const event: any = {
  //     target: {
  //      value: 'New'
  //     }
  //   };
  //   component.filterTransactionList(event);
  //   transactionService.emitNewTransaction(newTransaction)
  //   expect(component.transactionList.length).toEqual(1);
  // });

});
