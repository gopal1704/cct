import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investmentschemes',
  templateUrl: './investmentschemes.component.html',
  styleUrls: ['./investmentschemes.component.css']
})
export class InvestmentschemesComponent implements OnInit {
  
  
  /***FORM DECLARATIONS */
  InvestmentSchemesForm: FormGroup;  // From Group Instance
  investmentscheme: string;
  /******************/

  constructor(private fb: FormBuilder, private ds : DataService, private router : Router ) {

    this.InvestmentSchemesForm = fb.group({
      'investmentscheme': ''

    });
   }

  ngOnInit() {


  }

   setInvestmentScheme(formdata){

    if(formdata.investmentscheme){
     console.log(formdata)
         this.ds.NewInvestmentProcessData.investment_scheme = formdata.investmentscheme;
         console.log(this.ds.NewInvestmentProcessData);
         this.router.navigate(['/dashboard/paymentmethod']);

        }

   }

}
