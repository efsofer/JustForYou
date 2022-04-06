import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncentivesDetailsComponent } from './incentives-details.component';

describe('IncentivesDetailsComponent', () => {
  let component: IncentivesDetailsComponent;
  let fixture: ComponentFixture<IncentivesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncentivesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncentivesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
