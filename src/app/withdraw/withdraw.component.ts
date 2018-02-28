import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  WithdrawalForm: FormGroup;  // From Group Instance
  UserName: string;
  Password: string;

  constructor(private fb: FormBuilder) { 
    this.WithdrawalForm = fb.group({
      'amount': '',
      'accounttype': '',
      'accountdetails': '',

    });

  }

  ngOnInit() {



  }

}
