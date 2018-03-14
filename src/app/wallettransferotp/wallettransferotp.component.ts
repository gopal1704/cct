import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
declare var Messenger: any;

@Component({
  selector: 'app-wallettransferotp',
  templateUrl: './wallettransferotp.component.html',
  styleUrls: ['./wallettransferotp.component.css']
})
export class WallettransferotpComponent implements OnInit {
  
  constructor(private http :HttpClient ,private ds : DataService,private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router, private as: AuthenticationService) { }

  WalletTransferOtp : FormGroup;  // From Group Instance
  otp : any;
  emailData : any;
 URL = 'https://catcotrade.com/sendotp';
 proceed : boolean = true;


  ngOnInit() {

    console.log(this.ds.WalletTransferData);

    this.WalletTransferOtp = this.fb.group({
      'otp': ''

    });

    this.as.userProfile.subscribe((v)=>{
      this.emailData = {

      }
this.emailData.toemail = v.email;
this.emailData.otp = this.randomIntFromInterval(1000,9999);
this.emailData.toaccount = this.ds.WalletTransferData.to_account;
this.emailData.toname = this.ds.WalletTransferData.to_name;
this.emailData.amount = this.ds.WalletTransferData.amount;
console.log(this.emailData);
this.http.post(this.URL,this.emailData).subscribe(res =>{
  console.log(res);
  

});

    });

   


    // var result = this.http.get(`http://18.219.116.22:3000/`);
    // result.subscribe((v)=>{
    //   console.log(v);
    // });



  }


   randomIntFromInterval(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  verifyOtp(value){
    if(value.otp===this.emailData.otp){
      this.proceed  = false;

      console.log('otp verified');
      this.ds.transfer_to_wallet(this.emailData.amount,this.emailData.toaccount);
      Messenger().post({
        message: 'Wallet transfer successful!',
        type: 'success',
        showCloseButton: true
      });
      this.router.navigate(['/dashboard']);


    }
    else{
      console.log('otp incorrect');
      Messenger().post({
        message: 'Incorrect otp',
        type: 'success',
        showCloseButton: true
      });

    }

  }

}
