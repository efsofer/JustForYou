import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggested-images-dialog',
  templateUrl: './suggested-images-dialog.component.html',
  styleUrls: ['./suggested-images-dialog.component.scss']
})
export class SuggestedImagesDialogComponent implements OnInit {
  query;
  categories;
  selectedcategory;
  mockImages = [
    {
      path: './assets/images/mockImg/mock10.png',
      desc: 'שובר לחג במסעדה'
    },
    {
      path: './assets/images/mockImg/mock11.png',
      desc: 'טיול לצפון'
    },
    {
      path: './assets/images/mockImg/mock12.png',
      desc: 'לנפח בלונים בגימבורי'
    },
    {
      path: './assets/images/mockImg/mock.jpg',
      desc: 'שובר ארוחה בשלום פלאפל'
    },
    {
      path: './assets/images/mockImg/mock13.png',
      desc: 'טיול לדרום'
    },
    {
      path: './assets/images/mockImg/mock14.png',
      desc: 'המבורגר אחד'
    },
  ];
  isSelected: boolean;
  currentIndex: number;

  constructor() { }

  ngOnInit(): void {
  }

  chooseImage(index) {
    this.currentIndex = index;
    // this.isSelected
  }

}
