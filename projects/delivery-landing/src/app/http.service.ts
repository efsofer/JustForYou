import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const VCApi: string = '/vc-api';
const VCheaders = new HttpHeaders({ 'Content-Type': 'application/soap+xml; charset=utf-8', 'Accept': 'application/soap+xml; charset=utf-8' });
const CAApi: string = '/ca-api/cargo/Service.asmx/';
const CAheaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
const J4UApi: string = '/Api/External/';
const ShookBookApi: string = '/sb-api/';
const ShookBookKey: string = 'Tjb1GOsdo6Bdw1nj';
const ShookBookStoreID: string = '5906';

export interface Option {
  label: string,
  type: string,
  opts: { text: string, image: string }[]
}

export interface Benefit {
  tabtitle: string,
  header: {
    background: string,
    title: string,
    content: string,
    image: string
  },
  name: string,
  PromoID: number,
  isVC: number,
  combined: Benefit[],
  isDelivery: number,
  deliveryCompany: string,
  title: string,
  image: string,
  link: string,
  notes: string,
  options?: Option[],
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private router: Router) { }

  allBenefits: any;
  benefit: BehaviorSubject<Benefit> = new BehaviorSubject(null);
  CAParams: HttpParams;
  token: string = '';
  VC_PROMO_ID: string = '';
  VC_Voucher: string = '';
  VC_Trans: string = '';
  VC_JSON: any = {
    Trans: [
      {
        TransId: '',
        OrderNum: '',
        NumberOfClients: 0,
        OrderType: 1,
        ClientNum: 1,
        TransItems: [
          {
            ExtItemNum: this.VC_PROMO_ID,
            SequentialNum: "1",
            Amount: "1",
            ItemPrice: "0",
            Total: "0",
            BusinessCode: "0",
            OriginalPrice: "0",
            Discount: "0.00",
            PromotionCode: "",
            Color: "0",
            Size: "0",
            GroupName: "",
            Familly: "",
            AllowDiscount: "1",
            ParentItem: "",
            ItemName: "הטבה במשלוח דור חדש בשוברים"
          }
        ]
      }
    ]
  }

  getBenefits() {
    return this.http.get('./assets/benefits.json');
  }

  wrapXML(xmlBody: string): string {
    let xmlString: string = '<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">';
    xmlString += '<soap12:Body>' + xmlBody + '</soap12:Body></soap12:Envelope>';
    return xmlString;
  }

  wrapCommon(reqBody: string, funcName: string): string {
    let common: string = '<' + funcName + ' xmlns="https://ws.valuecard.co.il/pos/V5/"><RequestParameters><Common><RequestId>1</RequestId>';
    common += '<VCToken>ADAAD69F722C4A9D857483AB4D4A5F9A</VCToken><POSId>33232</POSId><POSPassword>459974</POSPassword><CashiersPassword>271620</CashiersPassword></Common>';
    common += reqBody;
    common += '</RequestParameters></' + funcName + '>';
    return this.wrapXML(common);
  }

  checkVoucher(voucherNum: string) {
    if ((!this.benefit.value && voucherNum.indexOf('620') === 0) || (this.benefit.value && this.benefit.value.isVC)) {
      let xmlBody: string = '<CardNumber>' + voucherNum + '</CardNumber><PIN></PIN><Coupon>-1</Coupon>';
      const xmlReq: string = this.wrapCommon(xmlBody, 'CardInformationEx');
      return this.http.post(VCApi, xmlReq, { headers: VCheaders, responseType: 'text' });
    }
    return this.http.get(J4UApi + 'checkcoupon?coupon=' + voucherNum);
  }

  submitDelivery(recipient: string, phone: string, street: string = '', streetNum: string = '', aptnum: string = '', floor: string = '', city: string = '', notes: string = '', sender: string = '',
    sphone: string = '', greeting: string = '', urge: string) {
    if (this.benefit.value.isDelivery) {
      let date = this.formatDate(new Date());
      let warehouseAdr = this.benefit.value.deliveryCompany == 'cargo' ? 'הבנאי;27;חולון;' : 'הש"ך;5;תל אביב;'
      let pParams: string = '1;' + warehouseAdr + street + ';' + streetNum + ';' + city + ';דור חדש בשוברים בע"מ;;' + notes + (aptnum ? (floor ? ' קומה: ' + floor + ',' : '') + ' דירה: ' + aptnum : '') + ';' + urge + ';0;2;0;1;0;;' + this.benefit.value.deliveryNum + ';' + this.VC_Voucher + ';';
      pParams += ';0;;;' + recipient + ';' + phone + ';;' + date + ';0';
      this.CAParams = new HttpParams({
        fromObject: {
          pParam: pParams
        }
      });
    }
    const sendJSON = {
      VCVoucherid: this.VC_Voucher,
      Package: this.benefit.value.name,
      SendName: sender,
      SendPhone: sphone,
      ReceiveName: recipient,
      ReceivePhone: phone,
      ReceiveAddress: street + ' ' + streetNum + ', ' + (aptnum ? (floor ? 'קומה: ' + floor + ', ' : '') + 'דירה: ' + aptnum + ', ' : '') + city,
      Notes: notes,
      Greeting: greeting,
      UserId: this.benefit.value.id || 0,
      SendMail: this.benefit.value.mail ? true : false
    };
    return this.http.post(J4UApi + 'InsertExternal', sendJSON);
  }


  submitCADelivery() {
    let postUrl = CAApi;
    if (this.benefit.value.deliveryCompany == 'isgav') postUrl = postUrl.replace('cargo', 'isgav');
    return this.http.post(postUrl + 'SaveData', this.CAParams, { headers: CAheaders, responseType: 'text' });
  }

  addDeliveryNum(dnum: number) {
    const sendJSON = {
      VCVoucherid: this.VC_Voucher + '-' + dnum,
      Package: 'מספר משלוח',
      SendName: '',
      SendPhone: '',
      ReceiveName: '',
      ReceivePhone: '',
      ReceiveAddress: '',
      Notes: (this.benefit.value.deliveryCompany == 'isgav') ? 'https://baldar.isgav.co.il/baldar/DeliveryStatus.aspx' : 'http://185.241.7.143/baldar/deliverystatus.aspx',
      Greeting: '',
      UserId: 0,
      SendMail: false
    }
    return this.http.post(J4UApi + 'InsertExternal', sendJSON);
  }

  submitConversion(extVoucher: string) {
    const sendJSON = {
      VCVoucherid: this.VC_Voucher,
      Package: this.benefit.value.name,
      SendName: '',
      SendPhone: '',
      ReceiveName: '',
      ReceivePhone: '',
      ReceiveAddress: '',
      Notes: 'המרת קוד: ' + extVoucher,
      Greeting: '',
      UserId: this.benefit.value.id || 0,
      SendMail: false
    };
    return this.http.post(J4UApi + 'InsertExternal', sendJSON);
  }

  changeCoupon() {
    const sendJSON = {
      SourceCoupon: this.VC_Voucher,
      CouponItem: this.benefit.value.convertId,
    };
    return this.http.post(J4UApi.substring(0, J4UApi.indexOf('/', 1)) + '/Coupon/ChangeCoupon', sendJSON);
  }

  changeNewCard() {
    const sendJSON = {
      SourceCoupon: this.VC_Voucher,
      CouponItem: this.benefit.value.convertId,
      Amount: 115
    };
    return this.http.post(J4UApi.substring(0, J4UApi.indexOf('/', 1)) + '/Coupon/ChangeNewCardCoupon', sendJSON);
  }

  sendSMS2(phone:string, recipient:string, benefit:string){
      let smsParams = new HttpParams({
        fromObject:{
          UserName: 'justforu',
          EncryptPassword: '659cc2b8b03141278286acd850be1a2b',
          Subscribers: phone,
          Message:`${recipient}, תודה על הזמנתך!
  
הזמנתך נקלטה במערכת והועברה לטיפול הספק.
המוצר שהזמנת: ${benefit}.
קוד שובר לזיהוי: ${this.VC_Voucher}.
תנאי המשלוח/איסוף הינם בהתאם לפירוט בדף המוצר.
 
בתודה,
דור חדש בשוברים`,
          SenderName: 'Just4u',
          DeliveryDelayInMinutes: '0',
          ExpirationDelayInMinutes: '0',
          SendId: ''
        }
      })
      return this.http.post(`/ext-api/tm/SendSms`, smsParams ,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },responseType:'text'
      })
  }


  sendSMS(extVoucher: string, validDate: string, phone: string) {
    let smsParams = new HttpParams({
      fromObject: {
        UserName: 'justforu',
        EncryptPassword: '659cc2b8b03141278286acd850be1a2b',
        Subscribers: phone,
        Message: `לקוח יקר,
הקוד שלך עבור ההטבה ${this.benefit.value.title} הוא: ${extVoucher}.
תוקף: ${validDate}. לפירוט והוראות מימוש: ${this.benefit.value.link}.
תודה, דור חדש בשוברים.
לשירותך בכל צורך: 03-5322313 שלוחה 1.`,
        SenderName: 'Just4u',
        DeliveryDelayInMinutes: '0',
        ExpirationDelayInMinutes: '0',
        SendId: ''
      }
    });
    return this.http.post('/ext-api/tm/' + 'SendSms', smsParams, { headers: CAheaders, responseType: 'text' });
  }

  encode(raw: string) {
    return this.http.get('https://www.just4u.co.il/api/Util/Encode?raw=' + raw);
  }

  redeemVoucher() {
    if (this.benefit.value.isVC) {
      const isNC = this.benefit.value.PromoID == 7407;
      this.VC_JSON.Trans[0].TransId = this.VC_Trans;
      this.VC_JSON.Trans[0].TransItems[0].ExtItemNum = this.VC_PROMO_ID;
      let xmlBody: string = '<CardNumber>' + this.VC_Voucher + '</CardNumber><TransactionSum>' + (isNC ? '115.0' : '0.0') + '</TransactionSum><CouponNum>-1</CouponNum><PromoNum>-1</PromoNum><Pin></Pin><VoidTransactionId>0</VoidTransactionId>';
      xmlBody += '<RequestedPromoIDs>' + this.VC_PROMO_ID.substring(0, this.VC_PROMO_ID.length - 1) + '</RequestedPromoIDs><JsonItems>' + JSON.stringify(this.VC_JSON) + '</JsonItems>';
      const xmlReq: string = this.wrapCommon(xmlBody, 'GetBenefitsQuery');
      return this.http.post(VCApi, xmlReq, { headers: VCheaders, responseType: 'text' });
    }
    const couponJSON = {
      coupon: this.VC_Voucher,
      itemId: this.benefit.value.PromoID
    }
    return this.http.post(J4UApi + 'consumecoupon', couponJSON);
  }
  
  updateRead(fromDate: string) {
    let params = {
      Token: this.token,
      FromInsertDate: fromDate
    }
    return this.http.post(J4UApi + 'UpdateReaded', params);
  }

  getBaldarSites() {
    return this.http.get('./assets/baldarsites.min.json');
  }

  formatDate(date: Date) {
    let year = date.getFullYear(), month = '' + (date.getMonth() + 1), day = '' + date.getDate();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return year + '-' + month + '-' + day;
  }

  loginUser(mail: string, password: string) {
    return this.http.post('/Api/connections/Login?mail=' + mail + '&password=' + password, {});
  }

  getEntries(name = '', code = '', fromInsertDate = '', toInsertDate = '') {
    let jsonParams: any = {
      UserId: this.token,
      Package: name,
      VCVoucherid: code,
      FromInsertDate: fromInsertDate,
      ToInsertDate: toInsertDate
    };
    return this.http.post(J4UApi + 'ExternalInfo', jsonParams);
  }

  /* START SHOOKBOOK */
  getNextDays() {
    return this.http.get(ShookBookApi + 'getNextDaysJSON?key=' + ShookBookKey);
  }

  getDaysForCity(city: string) {
    return this.http.get(ShookBookApi + 'getDaysForCityJSON?storeId=' + ShookBookStoreID + '&city=' + city + '&key=' + ShookBookKey);
  }

  submitOrder(recipient: string, phone: string, street: string, streetNum: string, city: string, aptnum: string, floor: string, entryCode: string, window: any) {
    const now = new Date(), nameSep = recipient.indexOf(' '), sendJSON = {
      type: 'neworder',
      store_id: ShookBookStoreID,
      key: ShookBookKey,
      date: now.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      id: this.VC_Voucher.substring(4),
      email: '',
      first_name: (nameSep == -1 || nameSep == 0) ? recipient : recipient.substring(0, nameSep),
      last_name: (nameSep == -1 || nameSep == 0) ? '' : recipient.substring(nameSep + 1),
      total_price: 115.0,
      payment_type: 'Invoice',
      phone: phone,
      city: city,
      street: street,
      street_no: streetNum,
      floor: floor ? floor : '',
      apartment: aptnum ? aptnum : '',
      entry_code: entryCode ? entryCode : '',
      delivery_date: this.formatDate(window.date),
      delivery_window: window.window,
      order_referrer_type: 'web',
      order_referrer_name: 'DorHadash',
      products: [
        {
          Name: "מארז שלוש גבינות ומחמצת",
          Price: 115.0,
          Qty: 1,
          SKU: "1080"
        }
      ]
    }
    return this.http.post(ShookBookApi + 'syncOrders', sendJSON);
  }

  submitShookBook(recipient: string, phone: string, street: string, streetNum: string, city: string, aptnum: string, floor: string, delivery: string) {
    const sendJSON = {
      VCVoucherid: this.VC_Voucher,
      Package: this.benefit.value.name,
      SendName: '',
      SendPhone: '',
      ReceiveName: recipient,
      ReceivePhone: phone,
      ReceiveAddress: street + ' ' + streetNum + ', ' + city,
      Notes: 'קומה: ' + floor + ', דירה: ' + aptnum + ', משלוח: ' + delivery,
      Greeting: '',
      UserId: 0,
      SendMail: this.benefit.value.mail ? true : false
    };
    return this.http.post(J4UApi + 'InsertExternal', sendJSON);
  }
  /* END SHOOKBOOK */

  routeTo(path: string) {
    this.router.navigate([path], { queryParamsHandling: "preserve" });
  }

  routeToParams(path: string, params: any) {
    this.router.navigate([path], { queryParamsHandling: "merge", queryParams: params });
  }

  routeToHome() {
    this.benefit.next(null);
    this.router.navigate(['/']);
  }

  routeTo404() {
    location.href = 'https://www.just4u.co.il/PageNotFound404.aspx';
  }

}