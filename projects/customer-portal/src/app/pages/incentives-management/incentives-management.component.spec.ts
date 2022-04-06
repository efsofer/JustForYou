import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncentivesManagementComponent } from './incentives-management.component';

describe('IncentivesManagementComponent', () => {
  let component: IncentivesManagementComponent;
  let fixture: ComponentFixture<IncentivesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncentivesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncentivesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
