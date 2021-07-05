import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { Component } from '@angular/core';
@Component({
  selector: 'mat-icon',
  template: '<div></div>'
})
class MockMatIconComponent {}


describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent, MockMatIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger event', () => {
    spyOn(component.inputChange, 'emit');
    const event = new InputEvent('change');

    component.onInputChange(event);
    expect(component.inputChange.emit).toHaveBeenCalled();
  });
});
