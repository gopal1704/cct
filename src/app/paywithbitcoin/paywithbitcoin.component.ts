import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var QRCode: any;
declare var $: any;
declare var Messenger: any;

@Component({
  selector: 'app-paywithbitcoin',
  templateUrl: './paywithbitcoin.component.html',
  styleUrls: ['./paywithbitcoin.component.css']
})


export class PaywithbitcoinComponent implements OnInit {
  public InvestmentDetails: any;
  public btcpayment: string = '';
  public paymentstate = false;
  public paymentaddress = "122YXXvEHjUTs67fXc3fFACx9PUkreXQfH";
  public paymentreceived: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private ds: DataService, private router: Router) { }

  ngOnInit() {

   


    this.InvestmentDetails = this.ds.NewInvestmentProcessData;
    new QRCode(document.getElementById("qrcode"), "122YXXvEHjUTs67fXc3fFACx9PUkreXQfH");
    // https://blockchain.info/tobtc?currency=USD&value=25

    var MonitorTransaction = new WebSocket('wss://ws.blockchain.info/inv');

    MonitorTransaction.onopen = function () {
      console.log("websocket connection open");
      MonitorTransaction.send(JSON.stringify({
        "op": "addr_sub", "addr": "122YXXvEHjUTs67fXc3fFACx9PUkreXQfH"


      }));
    };

    // MonitorTransaction.onmessage = function (onmsg) {
    //   var response = JSON.parse(onmsg.data);
    //   alert("message received");
    //   console.log(response);
    //   var transactionOutput = response.x.out;
    //   var transactionOutputLength = transactionOutput.length;

    //  for (var i=0;i<transactionOutputLength;i++){
    //   if(response.x.out[i]==""){

    //   }
    //  } 

    // }
    MonitorTransaction.onmessage = (onmsg) => {
      var response = JSON.parse(onmsg.data);
      alert("message received");
      console.log(response);
      var transactionOutput = response.x.out;
      var transactionOutputLength = transactionOutput.length;

      for (var i = 0; i < transactionOutputLength; i++) {
        if (response.x.out[i].addr == this.paymentaddress) {
          this.paymentstate = true;



          console.log('address match!');
          var amount = response.x.out[i].value;
          this.paymentreceived = amount / 100000000;
          Messenger().post({
            message: 'Payment Successful!',
            type: 'success',
            showCloseButton: true
          });
        }
      }
    }

    this.convertusdtobitcoin(this.ds.NewInvestmentProcessData.investment_amount);
  }


  convertusdtobitcoin(btc) {

    var result = this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${btc}`);

    result.subscribe((v) => {
      console.log(v)

      this.btcpayment = v.toString();
      console.log(typeof (v));
    });

  }


}
