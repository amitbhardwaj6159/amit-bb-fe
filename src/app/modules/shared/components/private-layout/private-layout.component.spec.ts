import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLayoutComponent } from './private-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: '<div></div>',
})
export class MockAppHeaderComponent {
}

@Component({
  selector: 'app-footer',
  template: '<div></div>',
})
export class MockAppFooterComponent {
}


describe('PrivateLayoutComponent', () => {
  let component: PrivateLayoutComponent;
  let fixture: ComponentFixture<PrivateLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PrivateLayoutComponent, MockAppHeaderComponent, MockAppFooterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
