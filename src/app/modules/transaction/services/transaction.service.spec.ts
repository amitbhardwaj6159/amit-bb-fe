import { TestBed, fakeAsync } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ITransactionList } from '../interfaces/transaction.interface';
import { environment } from '../../../../environments/environment';

const transactionData: ITransactionList = {
  data: [
    {
    categoryCode: '#12a580',
    dates: {
      valueDate: 123
    },
    transaction: {
      amountCurrency: {
        amount: 500,
        currencyCode: "EUR"
      },
      type: "Salaries",
      creditDebitIndicator: "DBIT"
    },
    merchant: {
      name: 'backbase',
      accountNumber: '13222',
    }
  }]
};

describe('TransactionListService', () => {
  let service: TransactionService;
  const mockHttpClient = {
    get: () =>  of(transactionData)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: mockHttpClient
        }
      ]
    });
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTransactionList() should return transaction list', () => {
    service.getTransactionList().subscribe((res) => {
        expect(res).toEqual(transactionData);
    });
  });
  it('getTransactionList() should return transaction list', () => {
    const httpClient = TestBed.get(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(transactionData));
    service.getTransactionList();
    expect(httpClient.get).toHaveBeenCalledWith(environment.apiUrl.transactionListApi);
  });
  it('getTransactionList() should call fallback when api fails', () => {
    const httpClient = TestBed.get(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(throwError(new Error('error')));
    service.getTransactionList();
    expect(httpClient.get).toHaveBeenCalled();
  });

  it('emitNewTransaction() should set new transaction in observable', fakeAsync(() => {
    service.newTransaction$.subscribe(newTranaction => {
      expect(newTranaction).toEqual(transactionData.data[0]);
    })
    service.emitNewTransaction(transactionData.data[0]);

    
  }));

  
});
