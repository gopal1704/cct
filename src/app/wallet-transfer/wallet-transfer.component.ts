import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wallet-transfer',
  templateUrl: './wallet-transfer.component.html',
  styleUrls: ['./wallet-transfer.component.css']
})
export class WalletTransferComponent implements OnInit {

  /***FORM DECLARATIONS */
  WalletTransferForm: FormGroup;  // From Group Instance
  
  /******************/
  constructor(private ds :DataService ,private fb: FormBuilder, private as: AuthenticationService, private router: Router,) {
    this.WalletTransferForm = fb.group({
      'amount': '',
      'toaccount': '',

    });
   }

  ngOnInit() {
    
  }

  transfer(formdata){
console.log(formdata);

this.ds.transfer_to_wallet(formdata.amount,formdata.toaccount);
  }

  confirmwallettransfer(formdata){
this.ds.WalletTransferData = formdata;
this.router.navigate(['/dashboard/wallettransferotp']);

  }

}
