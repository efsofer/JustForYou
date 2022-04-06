import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.scss']
})
export class PricelistComponent implements OnInit {

  id: string;
  priceList: any;
  done = false;

  constructor(private _api: ApiService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this._api.getPriceList(this.id).subscribe((data: any) => {
        this.priceList = data.dt[0];
        if (this.priceList) {
          this.titleService.setTitle(this.priceList.Info[0].Title);
          setTimeout(() => this.checkOverflow());
          this.priceList.Items.sort((a, b) => {
            if (a.IsGiftCard && !b.IsGiftCard) return -1;
            if (!a.IsGiftCard && b.IsGiftCard) return 1;
            return a.Price - b.Price;
          });
          this.done = true;
        }
      });
    }
    else this._api.routeTo404();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkOverflow();
  }

  checkOverflow() {
    const descs = document.querySelectorAll('.item-desc');
    if (window.innerWidth <= 576) {
      for (let i = 0; i < descs.length; ++i) {
        let desc = descs[i];
        if (desc.querySelector('.desc-content').scrollHeight > 200) {
          desc.classList.add('show-more');
        }
        else desc.classList.remove('show-more');
      }
    }
    else for (let i = 0; i < descs.length; ++i) {
      descs[i].classList.remove('show-more');
    }
  }

  expandItem(e: Event, el: Element) {
    e.preventDefault();
    e.stopPropagation();
    const descContent = el.querySelector('.desc-content');
    descContent.setAttribute('style', 'max-height: ' + descContent.scrollHeight + 'px;');
    el.classList.remove('show-more');
  }
}
