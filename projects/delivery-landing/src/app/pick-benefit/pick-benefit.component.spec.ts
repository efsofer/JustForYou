import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickBenefitComponent } from './pick-benefit.component';

describe('PickBenefitComponent', () => {
  let component: PickBenefitComponent;
  let fixture: ComponentFixture<PickBenefitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickBenefitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
