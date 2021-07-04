import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLandingComponent } from './transaction-landing.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-transfer',
  template: '<div></div>',
})
export class MockTransactionTransferComponent {
}

@Component({
  selector: 'app-transaction-list',
  template: '<div></div>',
})
export class MockTransactionListComponent {
}


describe('TransactionLandingComponent', () => {
  let component: TransactionLandingComponent;
  let fixture: ComponentFixture<TransactionLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionLandingComponent, MockTransactionTransferComponent, MockTransactionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
