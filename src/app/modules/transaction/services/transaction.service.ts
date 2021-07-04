import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of, EMPTY, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ITransactionList, ITransaction } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  private newTransaction: Subject<ITransaction> = new Subject<ITransaction>();
  public newTransaction$ = this.newTransaction.asObservable(); 

  constructor(private httpClient: HttpClient) { }

  public getTransactionList(): Observable<ITransactionList> {
    return this.httpClient.get(environment.apiUrl.transactionListApi)
    .pipe(
      map((res: any)=> res),
      catchError(error => {
        return this.httpClient.get(environment.apiUrl.transactionListMockApi);
      })
    ) as Observable<ITransactionList>;
  }

  public emitNewTransaction(newTransaction: ITransaction): void {
      this.newTransaction.next(newTransaction);
  }
}
