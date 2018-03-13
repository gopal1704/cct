import { Component, OnInit, transition } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { validateArgCount } from '@firebase/util/dist/esm/src/validation';
@Component({
  selector: 'app-wallet-transfer',
  templateUrl: './wallet-transfer.component.html',
  styleUrls: ['./wallet-transfer.component.css']
})
export class WalletTransferComponent implements OnInit {

  /***FORM DECLARATIONS */
  WalletTransferForm: FormGroup;  // From Group Instance
  amountlimit:number =  1;
  walletbalance : number = 0;
  proceed : boolean = false;
  amount : number = 0;
  accountstatus : boolean  = false;
  amountstatus : boolean = false;
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

    
    this.as.userAccountSummary.subscribe((v)=>{
      this.walletbalance = v.walletbalance;
    })

    
  }

  onSearchChange(value : string){
if(value && value!=""){
    //get name 
    var name =this.afs.doc<any>(`accountsummary/${value}`).valueChanges();
      
name.subscribe((v)=>{
  if(v){
  this.Accountname = 'Transfer to : '+ v.name;
 this.accountstatus = true;
 this.ds.WalletTransferData.to_account = value;
 this.ds.WalletTransferData.to_name = v.name;
 console.log()
  if(this.amountstatus == true && this.accountstatus && this.ds.WalletTransferData.amount <=this.walletbalance ){
  this.proceed = true;
}
}
  else{  this.Accountname = 'Account does not exist';
  this.accountstatus = false;
  this.proceed = false;
}
}),err=>{
  this.Accountname = 'Account does not exist';
}



}
else{
  this.proceed = false;
}
  }


  ///////

  onAmountChange(value : number){
if(value >= this.amountlimit){
this.amountstatus = true;
this.ds.WalletTransferData.amount = value;

if(this.amountstatus == true && this.accountstatus == true  ){
  this.ds.WalletTransferData.amount = value;
  this.proceed = true;
console.log(this.walletbalance);

}

}
else{
  this.amountstatus = false;
  this.proceed = false;
  
}
if(value<=this.walletbalance && value>=this.amountlimit){
this.proceed = true;
console.log('lesser');
}else{
  console.log('grater');
  this.proceed = false;
}
  }
  /////
  
  transfer(formdata){
console.log(formdata);

this.ds.transfer_to_wallet(formdata.amount,formdata.toaccount);
  }

  confirmwallettransfer(formdata){

this.router.navigate(['/dashboard/wallettransferotp']);

  }

}
