import { Component, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

declare function j4UCarousel(wrapper: HTMLElement): void;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  employee = this._http.employee.value;
  items = this.employee.items;
  height: number = 0;
  expandedActivity: number = 0;
  chosen: boolean = false;
  participants: string = '';
  ready: boolean = false;

  constructor(private _http: HttpService, private route: ActivatedRoute, private router: Router, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    if (!this._http.ids.OrderId || !this._http.ids.ValidationField) {
      this._http.routeTo404();
      return;
    }
    for (let cat of this.items) {
      for (let item of cat.items) {
        if (!item.combined_items) {
          if (item.images.length > 1) {
            item.images.push(item.images[0]);
            item.images.splice(0, 1);
          }
        }
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.height = 2 * this.el.nativeElement.querySelector('.gift-item').getBoundingClientRect().height - 56;
  }

  ngAfterViewInit() {
    this.height = 2 * this.el.nativeElement.querySelector('.gift-item').getBoundingClientRect().height - 56;
  }

  expand(event: any) {
    let wrapper = event.currentTarget.closest('.gift-wrapper');
    this.renderer.addClass(wrapper, 'expanded');
    setTimeout(() => j4UCarousel(wrapper));
  }

  expandPackage(event: any, item: any) {
    this.chosen = false;
    this.ready = false;
    let wrapper = event.currentTarget.closest('.gift-wrapper');
    this.renderer.addClass(wrapper, 'expanded');
    this.expandedActivity = 0;
    if (item.visited) {
      this.ready = true;
      return;
    }
    item.visited = true;
    let i = 0;
    for (let citem of item.combined_items) {
      ++i;
      let fullitem: any;
      this._http.getItem(citem.id).subscribe({
        next: (data) => fullitem = data, complete: () => {
          for (let supplier of fullitem.item[0].suppliers) {
            if (supplier.id == citem.supplierid) {
              if (!citem.supplierName) {
                citem.supplierName = supplier.name;
                citem.supplierLogo = supplier.logo;
                citem.aboutSupplier = supplier.description;
                if (supplier.features != '') citem.description = supplier.features;
              }
              citem.supplierPhone = supplier.phone;
              let address = supplier.addressinsite;
              if (supplier.city_name) address += ', ' + supplier.city_name;
              citem.supplierAddress = address;
              if (i == item.combined_items.length) this.ready = true;
            }
          }
        }
      });
    }
  }

  collapse(event: any) {
    event.stopPropagation();
    this.renderer.removeClass(event.currentTarget.closest('.gift-wrapper'), 'expanded');
  }

  closePackage(event: any) {
    event.stopPropagation();
    if (event.currentTarget != event.target) return;
    this.chosen = false;
    this.renderer.removeClass(event.currentTarget.closest('.gift-wrapper'), 'expanded');
  }

  openParty() {
    this.chosen = true;
  }

  doChoice(item: any) {
    this._http.ids.participants = this.participants;
    let choice: any = item;
    choice.extracharge = item.id == 192 || item.id == 243;
    this._http.choice.next(choice);
    this.router.navigate(['/selected'], { skipLocationChange: true, queryParamsHandling: 'preserve' });
    /*this._http.doChoice(<JSON>choice).subscribe({complete: () =>
      this._http.validateEmployee(<JSON>this._http.ids).subscribe({next: (data: any) => this._http.choice.next(data.response[0].history), complete: () => 
          this.router.navigate(['/selected'], {skipLocationChange: true, queryParamsHandling: 'preserve'})})});*/
  }

  cancelChange() {
    this.router.navigate(['/selected'], { skipLocationChange: true, queryParams: { id: this._http.ids.OrderId } });
  }

}
