import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { BbUIModule } from '../bb-ui/bb-ui.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

const sharedComponents = [
  PrivateLayoutComponent
]

@NgModule({
  declarations: [
    ...sharedComponents,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BbUIModule,
    RouterModule
  ],
  exports: [...sharedComponents]
})
export class SharedModule { }
