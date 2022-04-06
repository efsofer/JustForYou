import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpService) { }

  benefit: any;

  ngOnInit() {
    this.http.benefit.subscribe(val => {
      if (val && val.header) this.benefit = val.header;
    });
  }
}