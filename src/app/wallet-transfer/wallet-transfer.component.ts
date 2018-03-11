import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

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
  Accountname : any;
  constructor(private ds :DataService ,    private afs: AngularFirestore,
    private fb: FormBuilder, private as: AuthenticationService, private router: Router,) {
    this.WalletTransferForm = fb.group({
      'amount': '',
      'toaccount': '',

    });
   }

  ngOnInit() {

    
    
  }

  onSearchChange(value : string){

    //get name 
    var name =this.afs.doc<any>(`accountsummary/${value}`).valueChanges();
      
name.subscribe((v)=>{
  this.Accountname = 'Transfer to : '+ v.name;
}),err=>{
  this.Accountname = 'Account does not exist';
}
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
