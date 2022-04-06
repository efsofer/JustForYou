import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Output() triggerClick = new EventEmitter();
  isOpen = false;
  display = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  openMenu() {
    this.isOpen = !this.isOpen;
    this.triggerClick.emit(this.isOpen);
  }

  logout() {
    this.http.logout();
  }

}
