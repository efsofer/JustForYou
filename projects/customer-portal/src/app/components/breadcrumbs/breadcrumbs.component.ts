import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() items = [
    {
      title: 'עמוד 1',
      path: '#'
    },
    {
      title: 'עמוד 2',
      path: '#'
    },
    {
      title: 'עמוד 3',
      path: '#'
    },
    {
      title: 'עמוד 4',
      path: '#'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
