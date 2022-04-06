import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MsgList } from 'src/app/components/classesConsts/MsgList';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-add-new-employee-dialog',
  templateUrl: './add-new-employee-dialog.component.html',
  styleUrls: ['./add-new-employee-dialog.component.scss']
})
export class AddNewEmployeeDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddNewEmployeeDialogComponent>,
    private fb: FormBuilder, private dataService: HttpService) { }

  MsgList = MsgList;


  newEmpForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    mngEmail: ['', [Validators.email, Validators.required]],
    empWorkNumber: ['', [Validators.required]],
    empId: ['', [Validators.required]],
    sendDate: ['', [Validators.required]]

  });

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close('');
  }


  addNewEmpployee() {
    debugger
    if (this.newEmpForm.valid) {
      let empId = this.newEmpForm.get('empId').value;
      let empWorkNumber = this.newEmpForm.get('empWorkNumber').value;
      let empName = this.newEmpForm.get('name').value;
      let empPhone = this.newEmpForm.get('phone').value;
      let empEmail = this.newEmpForm.get('email').value;
      let empMngEmail = this.newEmpForm.get('mngEmail').value;
      let empSendDate = this.newEmpForm.get('sendDate').value;
      //empId, empName, empPhone, empEmail, empMngEmail, empSendDate

      this.dataService.InsertCust(this.data.activityId, empName, empPhone, empEmail, empMngEmail, empPhone, empWorkNumber, empSendDate).subscribe(result => {
        this.dialogRef.close({ result: result });
      })
    }



  }

}
