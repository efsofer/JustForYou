import { Component, OnInit, Renderer2, ElementRef, HostListener, Input, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { DeliveryComponent } from '../delivery/delivery.component';
import { HttpService, LinkedOrder } from '../http.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() orderIndex: number;
  @ViewChild('delForm') deliveryForm: DeliveryComponent;

  order: LinkedOrder;
  addonItems: any[] = [];
  items: any[] = [];
  autoChoose: boolean;
  inDelivery: boolean = false;
  height: number = 0;
  modalDialog: boolean = false;
  potentialChoice: any;
  isLoading: boolean = false;
  isIE: boolean = false;

  constructor(private _http: HttpService, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    if (!this._http.checkValidation()) return;
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident/') !== -1
      || navigator.appVersion.indexOf('Trident/') > -1) {
      this.isIE = true;
    }
    this.order = this._http.linkedOrders[this.orderIndex];
    this.initOrder();
  }

  initOrder() {
    this.addonItems = [];
    this.items = [];
    if (this.order.history) {
      this.addonItems = this.order.history;
      for (let item of this.addonItems) {
        item.name = item.ITemName;
        item.image = item.image.substring(item.image.lastIndexOf('/') + 1);
      }
    }
    this.autoChoose = this.order.autoChoose ? true : false;
    let isAddon = false;
    for (let item of this.order.items) {
      isAddon = false;
      if (this.autoChoose && item.id == this.order.autoChoose) {
        this.items.push(item);
        continue;
      }
      if (this.order.addonItems) {
        for (let itemid of this.order.addonItems) {
          if (item.id == itemid) {
            isAddon = true;
            break;
          }
        }
      }
      if (!isAddon && !this.autoChoose) this.items.push(item);
      else if (!this.order.history) this.addonItems.push(item);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.calcRect();
  }

  ngAfterViewInit() {
    this.calcRect();
  }

  expand(event: any) {
    let wrapper = event.currentTarget.parentElement;
    this.renderer.addClass(wrapper, 'expanded');
  }

  collapse(event: any) {
    event.stopPropagation();
    this.renderer.removeClass(event.currentTarget.parentElement.parentElement, 'expanded');
  }

  doPotentialChoice(item: any) {
    this.potentialChoice = item;
    if (!this.order.goToDelivery) {
      this.modalDialog = true;
    }
    else {
      this._http.product.next(this._http.allProducts[item.id]);
      this.inDelivery = true;
    }
  }

  doChoice(item: any) {
    this._http.choseOrderIndex = this.orderIndex;
    this.isLoading = true;
    let choice: any = {
      "OrderId": this._http.linkedOrders[this.orderIndex].orderId,
      "ValidationField": this._http.ids.ValidationField,
      "ItemId": item.id
    };
    if (item.IsGiftCard) choice.LoadSum = item.LoadSum;
    this._http.doChoice(<JSON>choice).subscribe({
      complete: () => {
        let employee = choice;
        delete employee.ItemId;
        if (employee.LoadSum) delete employee.LoadSum;
        this._http.validateEmployee(<JSON>employee).subscribe({
          next: (data: any) => employee = data.response, complete: () => {
            employee = employee[0];
            if (this._http.lockedOrderIndex != -1) {
              this._http.linkedOrders[this.orderIndex].history.push(employee.history[0]);
              this._http.routeTo('selected');
            }
            else {
              this._http.linkedOrders[this.orderIndex].history = employee.history;
              if (this.order.goToDelivery) this.deliveryForm.submitDelivery(); // assumes no addon items on "goToDelivery" order
              else this.doAddonChoice();
            }
        }});
      }
    });
  }

  doAddonChoice(i: number = 0) {
    if (!this.order.addonItems || i >= this.order.addonItems.length) {
      this._http.routeTo('selected');
      return;
    }
    let choice: any = {
      "OrderId": this._http.linkedOrders[this.orderIndex].orderId,
      "ValidationField": this._http.validationString(i),
      "ItemId": this.addonItems[i].id
    };
    if (this.addonItems[i].IsGiftCard) choice.LoadSum = this.addonItems[i].LoadSum;
    this._http.doChoice(<JSON>choice).subscribe({
      complete: () => {
        let employee = choice;
        delete employee.ItemId;
        if (employee.LoadSum) delete employee.LoadSum;
        this._http.validateEmployee(<JSON>employee).subscribe({
          next: (data: any) => employee = data.response, complete: () => {
            employee = employee[0];
            this._http.linkedOrders[this.orderIndex].history.push(employee.history[0]);
            this.doAddonChoice(i + 1);
        }});
      }
    });
  }

  deliveryHandler(event: number) {
    if (event == 0) {
      this.inDelivery = false
    }
    else if (event == 1) {
      this.modalDialog = true;
    }
    else if (event == 2) {
      this._http.routeTo('selected');
    }
  }

  ngOnChanges() {
    this.order = this._http.linkedOrders[this.orderIndex];
    this.inDelivery = false;
    this.initOrder();
    setTimeout(() => {
      this.calcRect();
    }, 1);
  }

  calcRect() {
    const giftItem = this.el.nativeElement.querySelector('.gift-item');
    if (giftItem) this.height = 2 * giftItem.getBoundingClientRect().height - 56;
  }

}
