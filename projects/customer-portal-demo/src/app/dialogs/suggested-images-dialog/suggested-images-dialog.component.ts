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
      path: 'https://www.just4u.co.il/Pictures/17252_16189_%D7%99%D7%95%D7%9E%D7%95%D7%9C%D7%93%D7%AA%D7%90%D7%AA%D7%A8%D7%9E%D7%AA%D7%A0%D7%95%D7%AA.jpg',
      desc: 'יום הולדת'
    },
    {
      path: 'https://www.just4u.co.il/Pictures/17140_%D7%99%D7%95%D7%9E%D7%95%D7%9C%D7%93%D7%AA%20%D7%90%D7%99%D7%A0%D7%93%D7%99%D7%92%D7%952.jpg',
      desc: 'יום הולדת 2'
    },
    {
      path: 'https://www.just4u.co.il/Pictures/passover-gifts.jpg',
      desc: 'פסח'
    },
    {
      path: 'https://www.just4u.co.il/Pictures/21931_PESSAH.jpg',
      desc: 'פסח 2'
    },
    {
      path: 'https://www.just4u.co.il/Pictures/baby-boy.jpg',
      desc: 'הולדת בן'
    },
    {
      path: 'https://www.just4u.co.il/Pictures/baby-girl.jpg',
      desc: 'הולדת בת'
    }
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
