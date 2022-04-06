import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEmployeeDialogComponent } from './add-new-employee-dialog.component';

describe('AddNewEmployeeDialogComponent', () => {
  let component: AddNewEmployeeDialogComponent;
  let fixture: ComponentFixture<AddNewEmployeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewEmployeeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
