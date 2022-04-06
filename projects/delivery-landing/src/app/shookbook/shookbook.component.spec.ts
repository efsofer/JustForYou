import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShookbookComponent } from './shookbook.component';

describe('ShookbookComponent', () => {
  let component: ShookbookComponent;
  let fixture: ComponentFixture<ShookbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShookbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShookbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
