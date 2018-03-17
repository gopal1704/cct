import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

declare var Messenger: any;

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})


//name
export class WithdrawComponent implements OnInit {
  proceed : boolean = false;
  country : boolean = false;
  WithdrawalForm: FormGroup;  
  UserName: string;
  Password: string;
  WalletBal : number = 0;
  public withdrawalmethod : string;
  constructor(private fb: FormBuilder,private ds :DataService,  private router: Router,   private as: AuthenticationService,
  ) { 
    this.WithdrawalForm = fb.group({
      'amount': '',
      'accounttype': '',
      'accountdetails': '',
'bankname' : '',
'accountnumber' : '',
'ifsc' : '',
'moneypolo' : '',
'paypal' : '',
'bitcoin' : ''

    });

  }

  ngOnInit() {

    this.as.userProfile.subscribe(v=>{
      if(v.country=="India"){
     this.country ==true;

      }
    })

    this.as.userAccountSummary.subscribe((summary) => {

      if (summary) {
          this.WalletBal =summary.walletbalance;
          console.log("this summary");

      }
  }) ;

  }
  onAmountChange(value){
    if(value<=this.WalletBal){
      this.proceed=true;
    }
    else{
      this.proceed = false;
    }
  }
  sendrequest(formdata){
// 
var validate = false;
if(formdata.accounttype=='bank'){

  if(!(formdata.bankname=="")&&!(formdata.ifsc=="")&&!(formdata.accountnumber=="")){
    validate = true;
  }
}
if(formdata.accounttype=='paypal'){

  if(!(formdata.paypal=="")){
    validate = true;
  }
}
if(formdata.accounttype=='moneypolo'){

  if(!(formdata.moneypolo=="")){
    validate = true;
  }
}
if(formdata.accounttype=='bitcoin'){

  if(!(formdata.bitcoin=="")){
    validate = true;
  }
}
//
////

if(validate==true){

console.log(formdata);
var d = formdata;
d.timestamp = Date.now();

this.as.userAccountSummary.subscribe((summary) => {

  if (summary) {
d.uid = summary.uid;
this.ds.withdrawal_request(d);
Messenger().post({
  message: 'Withdrawal request sent!',
  type: 'success',
  showCloseButton: true
});
this.router.navigate(['/dashboard']);
  }
}) ;
}
else{
  Messenger().post({
    message: 'Please enter all necessary details',
    type: 'error',
    showCloseButton: true
  });
}

////
  }

onwithdrawmethodselect(type){

if(type==='bank'){
  this.withdrawalmethod= 'bank';
  console.log(type);
}
else if(type === 'paypal'){    this.withdrawalmethod= 'paypal';
console.log(type);

}
else if (type==='moneypolo'){   this.withdrawalmethod= 'moneypolo';
console.log(type);

}
else if (type === 'bitcoin'){  this.withdrawalmethod= 'bitcoin';
console.log(type);

}

}

}
