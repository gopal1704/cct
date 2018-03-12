import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})


//name
export class WithdrawComponent implements OnInit {

  WithdrawalForm: FormGroup;  // From Group Instance
  UserName: string;
  Password: string;
  public withdrawalmethod : string;
  constructor(private fb: FormBuilder,private ds :DataService) { 
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



  }
  sendrequest(formdata){
console.log(formdata);
var d = formdata;
d.timestamp = Date.now();
this.ds.withdrawal_request(d);
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
