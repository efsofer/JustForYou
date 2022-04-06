import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeambuildsApproverComponent } from './teambuilds-approver.component';

describe('TeambuildsApproverComponent', () => {
  let component: TeambuildsApproverComponent;
  let fixture: ComponentFixture<TeambuildsApproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeambuildsApproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeambuildsApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
