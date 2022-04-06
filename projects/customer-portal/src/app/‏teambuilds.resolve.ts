import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class TBResolver implements Resolve<any> {
    
    constructor(private http: HttpService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Promise<any> {
        const PkgId = route.queryParamMap.get('tbid');
       console.log(PkgId)
        return new Promise(resolve => {
            this.http.getTBPackage(PkgId).subscribe({
                next: (res: any) => {
                    if (res && res.response && res.response.length) {
                        if (res.response[0].WorksWithApprover) {
                            this.http.getApproverCusts(res.response[0].Id).subscribe({
                                next: (resp: any) => {
                                    if (resp && resp.returnobj && resp.returnobj.length) {
                                        this.processCusts(res.response[0], resp.returnobj[0]);
                                        return resolve(res.response[0]);
                                    }
                                }
                            })
                        }
                        else return resolve(EMPTY);
                    }
                }
            })
        });
    }

    processCusts(tbpkg: any, custsObj: any) {
        tbpkg.recipients = custsObj.Total;
        let chose = 0, pending = 0, usedBudget = 0;
        for (let cust of custsObj.Custs) {
            if (cust.orderid) {
                ++chose;
                if (cust.Status == 2 || cust.Status == 3) ++pending;
                else usedBudget += tbpkg.Price4Individual * cust.Participants;
            }
        }
        tbpkg.chose = chose;
        tbpkg. pending = pending;
        tbpkg.totalUsedBudget = usedBudget;
        tbpkg.Custs = custsObj.Custs;
        delete tbpkg.Groups;
    }
}