import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {

  id: string;
  packageHeader: any;
  vldField: string = '';
  vldValue: string = '';
  vldLabel: string = '';
  isError: boolean = false;
  errorText: string;
  unsupportedBrowser: boolean = false;
  noValidation = ["OmtlyBniXqPD9KqeYSziuA2","9Y6CqXWnOdG26q3QdgRKKQ2","tzOWx12gVMXVTcWAqgB8rg2","FisaoOCnJWfsXwHnqKYljQ2","xCIGgLd2tlijS48I49FrgQ2","-L4A03HMny9_fXEgvQHPlQ2","2GeTrdE4ker7Iv2bTpY-Gw2","0Sx0IDq3KEI3IgnD-l8wuA2","atjSlYwWTkU3nAQ5FPjLOw2","V-yij5Qeb79Qcz3Qjbes8g2","LFZB4RI8ohIt86-ysdbzWg2","K7g5cxzhdR6nXYw-6IHCQQ2","AVpQgMfTltS7zRFSBddS3A2","2Yl-nfZ_sVK7XyYZsr76xg2","_KRwPtbHB4Iw-evO9OMxWA2","1VTGpZz7GX0hP77i3ytDdA2","mRc-bofeuk5rpaFX11g-fA2","Ch46PiJAVoKUPnno5W8lpA2"];

  constructor(private _http: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id='azjiIxmg432wtNWYsvgmyQ2'
    // this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this._http.getPackageHeader(this.id);
      this._http.pkgHeader.pipe(take(2)).subscribe({
        next: data => this.packageHeader = data, complete: () => {
          if (this.noValidation.includes(this.id)) {
            this._http.ids.PackageId = this.id;
            this.vldValue = '123456';
            this.onVldSubmit();
          }
          if (this.id == '24aUNpnPlceKBJ5p7CO4bA2' || this.id == 'Ahwnx0k1qPJ4t6Ce_FNjyw2' || this.id == 'M1rNq9mZ-VhLQwSAKmHECQ2') this.vldLabel = 'קוד מזהה'; // discount bank validation
          else {
            this.vldField = this.packageHeader.ValidationType;
            this.setVldLabel();
          }
          this._http.ids.PackageId = this.id;
          /* if inactive, route to 404
          if (!this.packageHeader.active) {
            this._http.routeTo404();
            return;
          }*/
        }
      });
    }
    else this._http.routeTo404();
  }

  setVldLabel() {
    switch (this.vldField) {
      case 'WORKER_NO': {
        this.vldLabel = 'מספר עובד';
        break;
      }
      case 'TZ': {
        this.vldLabel = 'מספר תעודת זהות';
        break;
      }
      case 'PHONE': {
        this.vldLabel = 'מספר טלפון';
        break;
      }
    }
  }

  onVldSubmit() {
    let employee: any = {
      PackageId: this.id,
      ValidationField: this.vldValue
    }
    this._http.validateEmployee(<JSON>employee).subscribe({
      next: (data: any) => {
        this._http.employee.next(data.response);
      }, error: () => {
        this.notIdentified();
        return;
      }, complete: () => {
        if (!this._http.employee.value.length) {
          this.notIdentified();
          return;
        }
        this._http.employee.next(this._http.employee.value[0]);
        this._http.ids.ValidationField = this.vldValue;
        employee = this._http.employee.value;
        if (!employee.OrderId) {
          let expiryDate = new Date(this.packageHeader.EndTime);
          expiryDate.setDate(expiryDate.getDate() + 1);
          let today = new Date();
          if (today > expiryDate || this.packageHeader.active != 1) {
            this.errorText = 'מצטערים, לא ניתן לבחור עוד ימי גיבוש באתר זה :(';
            this.isError = true;
            return;
          }
          this.routeTo('/select');
        }
        else {
          this._http.activity.next(this._http.employee.value.TBHistory);
          this.routeTo('/selected');
        }
      }
    });
  }

  notIdentified() {
    this.errorText = 'מצטערים, לא מצאנו אתכם...\nאנא פנו לארגון שלכם או לשירות דור חדש בשוברים בטלפון: 03-5322313';
    this.isError = true;
  }

  routeTo(path: string) {
    this.router.navigate([path], { queryParamsHandling: 'preserve' });
  }

}