import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesChatComponent } from './notes-chat.component';

describe('NotesChatComponent', () => {
  let component: NotesChatComponent;
  let fixture: ComponentFixture<NotesChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
