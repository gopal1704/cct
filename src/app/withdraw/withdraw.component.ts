import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  WithdrawalForm: FormGroup;  // From Group Instance
  UserName: string;
  Password: string;

  constructor(private fb: FormBuilder,private ds :DataService) { 
    this.WithdrawalForm = fb.group({
      'amount': '',
      'accounttype': '',
      'accountdetails': '',

    });

  }

  ngOnInit() {



  }
  sendrequest(formdata){
console.log(formdata);

this.ds.withdrawal_request(formdata.amount,formdata.accounttype,formdata.accountdetails);
  }

}
