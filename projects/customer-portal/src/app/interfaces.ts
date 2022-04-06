export interface Cust {
    Custid: number;
    Phone: string;
    Name: string;
    Email: string;
    MenagerEmail: string;
    TZ: string;
    workerNo: string;
    Department: string;
    OrigSendDate: Date;
    OrgChoosedDate: Date;
    sendDate: Date;
    LastSendDate: Date;
    ItemId: number;
    itemName: string;
    VoucherId: string;
    source: number;
    UserId: number;
    Teambuilid: number;
    TeamBuildName: string;
    SendReason: string;
    ActivityId: number;
    ActivityName: string;
    Status: string;
    LoadSum: number,
    giftType: number,
    Guid: string,
    QueryDate: Date;
    status?: string;
}

export interface Activity {
    id: number;
    name: string;
    image: string;
    creationDate: string;
    sendDate: string;
    sendReason: string;
    type: number;
    recipients: number;
    received: number;
    chose: number;
    budgetPerEmployee: number;
    totalAllocatedBudget: number;
    totalUsedBudget: number;
    Custs: Cust[];
    Total: number,
    pieData?: any,
    chartData?: any,
    chartOptions?: any
}

// export class PieData {
//     number: any;
//     title: string;
//     datasets: Dataset[]
//     labels: any;
//     constructor() {
//         this.number = 0;
//         this.title = '';
//         this.datasets =null
//         this.labels = '';
//     }
// };
// export class Dataset {
//     data: Data;
//     backgroundColor: any;
//     hoverBackgroundColor: any;
//     constructor() {
//         this.data = new Data();
//         this.backgroundColor = '';
//         this.hoverBackgroundColor = '';
//     };
// }
// export class Data {
   
//     constructor(private s1?,private s2?,private s3?) {
//         this.s1 = '';
//         this.s2 = '';
//         this.s3 = 0;
//     };
// }