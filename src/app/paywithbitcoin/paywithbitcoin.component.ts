import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var QRCode: any;

@Component({
  selector: 'app-paywithbitcoin',
  templateUrl: './paywithbitcoin.component.html',
  styleUrls: ['./paywithbitcoin.component.css']
})


export class PaywithbitcoinComponent implements OnInit {
 public  InvestmentDetails : any ;
  constructor(private fb: FormBuilder, private ds : DataService, private router : Router) { }

  ngOnInit() {

this.InvestmentDetails =this.ds.NewInvestmentProcessData;
new QRCode(document.getElementById("qrcode"), "122YXXvEHjUTs67fXc3fFACx9PUkreXQfH");


    var MonitorTransaction = new WebSocket('wss://ws.blockchain.info/inv');

  }



}
