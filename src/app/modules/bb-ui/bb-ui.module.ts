import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { MatIconModule } from '@angular/material/icon';

const COMPONENTS = [
  FooterComponent,
  LogoComponent,
  SubmitButtonComponent,
  FilterComponent,
  TransactionItemComponent,
];
@NgModule({
  declarations: COMPONENTS,
  // lni-search icon was not there in bb module for filter so had to import MatIconModule
  imports: [MatIconModule],
  exports: COMPONENTS,
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BbUIModule { }
