import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var QRCode: any;
declare var $: any;
declare var Messenger: any;
interface btc {
  address: string;
  index: number;
  callback: string;
}

@Component({
  selector: 'app-paywithbitcoin',
  templateUrl: './paywithbitcoin.component.html',
  styleUrls: ['./paywithbitcoin.component.css']
})


export class PaywithbitcoinComponent implements OnInit {

  public InvestmentDetails: any;
  public btcpayment: string = '';
  public paymentstate = false;
  public paymenterror = false;
  public paymenticon = false;
  public paymentaddress: string;
  public paymentreceived: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private ds: DataService, private router: Router) { }

  ngOnInit() {



    this.ds.initalize();




    this.paymentaddress = "";


    this.InvestmentDetails = this.ds.NewInvestmentProcessData;
    // https://blockchain.info/tobtc?currency=USD&value=25
    // /http%3A%2F%2F18.219.116.22%3A3000%2Fcallback
    var url = "https://api.blockchain.info/v2/receive?xpub=xpub6CEpb79zVLj9qdVcwKmsrKPmiafn3KChzaSqxumSLaiwekzGhaMKt8bLraMSdkupKaUCR9zvJMkipMXAx3dnR86LPYmoKu6k3zFGEznzAkq&&callback=http%3A%2F%2F18.219.116.22%3A3000%2Fcallback&key=d06ca415-9e77-4705-855f-7881c25f1a38"


    var bitcoinadd = this.http.get<btc>(url);
    bitcoinadd.subscribe(
      (v) => {
        console.log(v);
        this.paymentaddress = v.address;
        this.convertusdtobitcoin(this.ds.NewInvestmentProcessData.investment_amount);

        /////////
       
        ////






      }
    );


  }


  convertusdtobitcoin(btc) {

    var result = this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${btc}`);

    result.subscribe((v) => {
      console.log(v)

      this.btcpayment = v.toString();
      var qrstr = `bitcoin:${this.paymentaddress}?amount=${this.btcpayment}`;
      new QRCode(document.getElementById("qrcode"), qrstr);
           
      var MonitorTransaction = new WebSocket('wss://ws.blockchain.info/inv');

      MonitorTransaction.onopen = () => {
        console.log("websocket connection open");
        MonitorTransaction.send(JSON.stringify({
          "op": "addr_sub", "addr": this.paymentaddress


        }));
      };

      MonitorTransaction.onmessage = (onmsg) => {
        MonitorTransaction.close();
        var response = JSON.parse(onmsg.data);
        console.log(response);
        var transactionOutput = response.x.out;
        var transactionOutputLength = transactionOutput.length;

        for (var i = 0; i < transactionOutputLength; i++) {
          if (response.x.out[i].addr === this.paymentaddress) {


            this.paymenticon= true;
            console.log('address match!');
            var amount = response.x.out[i].value;
            this.paymentreceived = amount / 100000000;
           
            if (this.paymentreceived === this.btcpayment) {
              this.paymentstate = true;

              this.ds.create_investment("SCO1", this.InvestmentDetails.investment_amount, amount / 100000000);
            } else {
              this.paymenterror = true;

              Messenger().post({
                message: 'Payment not approved received payment is less than actual payment.',
                type: 'error',
                showCloseButton: true
              });
            }
            break;
          }
        }
      }





      ////


      /////

      console.log(typeof (v));
    });

  }


}
