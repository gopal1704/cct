import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
declare var $: any;

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.css']
})
export class PaymentmethodComponent implements OnInit {


  /***FORM DECLARATIONS */
  PaymentMethodForm: FormGroup;  // From Group Instance
  amount: number;
  paymentmethod: string;
  /******************/
  proceed : boolean = false;



  constructor(private fb: FormBuilder, private ds: DataService, private router: Router) {
    this.PaymentMethodForm = fb.group({
      'amount': '',
      'paymentmethod': ''
    });


  }

  ngOnInit() {
     
  }
  onAmountChange(value){
if(value>=500){
this.proceed = true;
}
else{
  this.proceed = false;
}
  }

  gotopayment(formdata){

      
console.log(formdata);
     if(formdata.amount&&formdata.paymentmethod){
       if(formdata.paymentmethod==='bitcoin'){
                 
        this.ds.NewInvestmentProcessData.investment_amount=formdata.amount;
        this.ds.NewInvestmentProcessData.payment_method=formdata.paymentmethod;
         console.log(this.ds.NewInvestmentProcessData);
          this.router.navigate(['/dashboard/paywithbitcoin']);
       }

       if(formdata.paymentmethod==='wallet'){
                 
        this.ds.NewInvestmentProcessData.investment_amount=formdata.amount;
        this.ds.NewInvestmentProcessData.payment_method=formdata.paymentmethod;
         console.log(this.ds.NewInvestmentProcessData);
          this.router.navigate(['/dashboard/investfromwallet']);
       }
     }

  }


  


}
