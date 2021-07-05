import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListComponent } from './transaction-list.component';
import { Component, Injectable } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction.service';
import { ITransactionList, ITransaction } from '../../interfaces/transaction.interface';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
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
  selector: 'mat-icon',
  template: '<div></div>',
})
export class MockIconComponent {
}

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
}

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatInputModule, MatDialogModule],
      declarations: [ TransactionListComponent, MockFilterComponent,
        MockTransactionItemComponent, MockIconComponent ],
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
    component.originalTransactionList = transactionList.data;
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
    
    component.transactionList = transactionList.data;
    component.originalTransactionList = transactionList.data;
    component.filterTransactionList(event);
    expect(component.transactionList.length).toEqual(2);

  });


});
