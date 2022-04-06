import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Activity, Cust } from './interfaces';
import { pluck } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable()
export class CustsResolver implements Resolve<Activity> {
    
    constructor(private http: HttpService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Promise<Activity> {
        const ActID = parseInt(route.paramMap.get('id'));
        let activity: Activity = {
            id: ActID,
            name: 'מתנות ימי הולדת',
            image: 'https://www.just4u.co.il/GreettingPics/22567_bday_cake.jpg',
            creationDate: new Date('2021-01-06').toISOString(),
            sendDate: 'יום ההולדת של העובדים',
            sendReason: 'מתנות ימי הולדת',
            type: 2, // SelectGift
            recipients: 0,
            received: 0,
            chose: 0,
            budgetPerEmployee: 85.0,
            totalAllocatedBudget: 0,
            totalUsedBudget: 0,
            Custs: [],
            Total: 0
        };
        if (this.http.dealerId == 24741) {
            if (ActID == 22871) {
                activity.image = 'https://www.just4u.co.il/Pictures/21495_20201217%20birthdaysite_v2_sm.jpg',
                activity.creationDate = new Date('2021-01-01').toISOString(),
                activity.budgetPerEmployee = 65;
            }
            else if (ActID == 23005) {
                activity.name = 'מתנות הוקרה',
                activity.image = 'https://www.just4u.co.il/Pictures/22047_950.jpg',
                activity.creationDate = new Date('2021-01-11').toISOString(),
                activity.sendReason = 'וותק';
                activity.budgetPerEmployee = 600;
            }
            else if (ActID == 22546) {
                activity.name = 'אתר מתנות לזכייה בחידון',
                activity.image = 'https://www.just4u.co.il/Pictures/22378_bggift.jpg',
                activity.creationDate = new Date('2020-12-22').toISOString(),
                activity.sendReason = 'פרסים לפורים';
                activity.budgetPerEmployee = 100;
            }
            else if (ActID == 24568) {
                activity.name = 'מתנות יום המשפחה',
                activity.image = 'https://www.just4u.co.il/Pictures/24475_%D7%A7%D7%A7%D7%A7%D7%A7%D7%A7.jpg',
                activity.creationDate = new Date('2021-02-24').toISOString(),
                activity.sendReason = 'יום האישה';
                activity.budgetPerEmployee = 100;
            }
        }

        return new Promise(resolve => {
            this.http.getCusts(activity.sendReason).pipe(pluck('returnobj')).subscribe({
                next: (res: any) => {
                    if (res) {
                        this.getCustsProcess(res[0], activity);
                        return resolve(activity);
                    }
                }/*, error: () => {
                    this.http.login().subscribe((res: any) => {
                        if (res.Token) {
                            this.http.token = res.Token;
                            localStorage.setItem('j4u_hrtoken', res.Token);
                            this.http.getCusts().pipe(pluck('returnobj')).subscribe({next: (res: any) => {
                                if (res) {
                                    this.getCustsProcess(res[0], activity);
                                    return resolve(activity);
                                }}, error: () => {
                                    this.router.navigateByUrl('/404'); return resolve(null);
                                }
                            });
                        }
                    });
                }*/
            })
        });
    }

    getCustsProcess(res: any, activity: Activity) {
        activity.Custs = res.Custs;
        activity.totalUsedBudget = activity.budgetPerEmployee * res.Total;
        activity.recipients = res.Total;
        let chose = 0, received = 0;
        for (let cust of activity.Custs) {
            if (cust.ItemId) {
                ++chose;
                ++received;
            }
            else if (cust.OrigSendDate) {
                if (cust.OrigSendDate && new Date(cust.OrigSendDate) < new Date()) ++received;
            }
        }
        activity.chose = chose;
        activity.received = received;
    }
}