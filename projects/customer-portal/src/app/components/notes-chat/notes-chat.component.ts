import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-chat',
  templateUrl: './notes-chat.component.html',
  styleUrls: ['./notes-chat.component.scss']
})
export class NotesChatComponent implements OnInit {
  private _notes: string;
  private _status: number;
  private _name: string;
  @Input() set notes(value: string) {
    if (!value) return;
    this._notes = value;
    this.constructNotesArray();
  }
  get notes(): string {
    return this._notes;
  }
  @Input() set status(value: number) {
    if (!value) return;
    this._status = value;
  }
  get status(): number {
    return this._status;
  }
  @Input() set name(value: string) {
    if (!value) return;
    this._name = value;
  }
  get name(): string {
    return this._name;
  }
  messages: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  constructNotesArray() {
    this.messages = [];
    let j = 0;
    if (this.notes.indexOf('אתר גיבושים-') === 0)
      j = 12; // length of 'אתר גיבושים-'
    let end = this.notes.indexOf('[[', j);
    while (end !== -1) {
      if (j < end) this.messages.push({msg: this.notes.substring(j, end).trim(), cust: 1});
      j = end + 19; // length of '[[ הערת גורם מאשר: '
      end = this.notes.indexOf(']]', end);
      if (j < end) this.messages.push({msg: this.notes.substring(j, end).trim(), cust: 0});
      j = end + 2; // length of ']]'
      end = this.notes.indexOf('[[', j);
    }
    if (this.notes.length > j && this.status == 2) this.messages.push({msg: this.notes.substring(j).trim(), cust: 1});
  }

}
