import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeambuildDetailsComponent } from './teambuild-details.component';

describe('TeambuildDetailsComponent', () => {
  let component: TeambuildDetailsComponent;
  let fixture: ComponentFixture<TeambuildDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeambuildDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeambuildDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
