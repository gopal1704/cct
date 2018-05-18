import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
declare var Messenger: any;
declare var $: any;

@Component({
  selector: 'app-investfromwallet',
  templateUrl: './investfromwallet.component.html',
  styleUrls: ['./investfromwallet.component.css']
})

export class InvestfromwalletComponent implements OnInit {
WalletBalance : any;
InvestmentDetails : any;
WalletBal : number;
Amount : number;
proceed : boolean = true;

  constructor(private as: AuthenticationService,private http: HttpClient, private fb: FormBuilder, private ds: DataService, private router: Router) {
    this.InvestmentDetails = this.ds.NewInvestmentProcessData;
    this.Amount = this.InvestmentDetails.investment_amount;
   
   }

  ngOnInit() {

    this.as.userAccountSummary.subscribe((summary) => {

      if (summary) {
          this.WalletBal =summary.walletbalance;
          console.log("this summary");

      }
  }) ;


  }
gotodashboard(){
  this.router.navigate(['/dashboard']);

}


  createinvestment(){
if(this.Amount<=this.WalletBal && this.Amount>=500){
  this.proceed=false;
    this.ds.create_investmentwallet('SCO1', this.Amount, 0);

    //alert box
    $('#paymentsuccess').modal('show');

    //
    Messenger().post({
      message: 'Payment Success!',
      type: 'success',
      showCloseButton: true
    });



  }
  else{
    this.proceed = false;
    Messenger().post({
      message: 'Error please make sure there is sufficient funds in your wallet!',
      type: 'error',
      showCloseButton: true
    });
  }
}

}
