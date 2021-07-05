import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { take, takeUntil } from 'rxjs/operators';
import { ITransaction, ITransactionList, ILabels } from '../../interfaces/transaction.interface';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { TransactionConstant } from '../../constants/transaction.constant';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {
  
  displayedColumns: string[] = ['transactionColor', 'date', 'merchant', 'amount'];
  public transactionList: ITransaction[];
  originalTransactionList: ITransaction[];
  @ViewChild(MatTable) transactionTable!: MatTable<any>;
  private filteredText: string = '';
  private unsubscribe: Subject<void> = new Subject<void>();
  public labels: ILabels = TransactionConstant.labels;

  constructor(private transactionService: TransactionService) { }


  ngOnInit(): void {
    this.getTransactionList();
    this.subscribeForNewTransaction();
  }

  private getTransactionList(): void {
    this.transactionService.getTransactionList()
    .pipe(take(1))
    .subscribe((res: ITransactionList) => {
      this.transactionList = res.data;
      this.originalTransactionList = JSON.parse(JSON.stringify(res.data));
      this.transactionList.sort((transaction1: ITransaction, transaction2: ITransaction) => {
        return transaction2.dates.valueDate - transaction1.dates.valueDate;
      });
    })
  }

  private subscribeForNewTransaction(): void {
    this.transactionService.newTransaction$
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((newTransaction: ITransaction) => {
      if (newTransaction) {
        // check if filter is already applied
        this.filteredText = this.filteredText ? this.filteredText.toLowerCase() : '';
        const newTransactionMerchantName = newTransaction.merchant.name ? newTransaction.merchant.name.toLowerCase(): '';
        if (this.filteredText && newTransactionMerchantName.includes(this.filteredText)) {
            this.transactionList.unshift(newTransaction);
        } else if (!this.filteredText){
          this.transactionList.unshift(newTransaction);
        }
        this.originalTransactionList.unshift(newTransaction);
        // to apply changes to the mat table
        // this.transactionTable.renderRows();
      }
    })
  }

  public filterTransactionList(event: Event): void {
    const target = event.target as HTMLInputElement
    if (target && target.value) {
      this.filteredText = target.value;
      const filterText = target.value.toLowerCase();
      this.transactionList = this.transactionList.filter((transactionItem: ITransaction) => {
        return transactionItem.merchant.name.toLowerCase().includes(filterText);
      })
    } else {
      // reassign original object by deep cloning.
      this.transactionList = JSON.parse(JSON.stringify(this.originalTransactionList));
      this.filteredText = '';
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
