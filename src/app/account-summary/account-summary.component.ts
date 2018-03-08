import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

declare var Chart: any;
interface AccountSymmaryData {
    uid: string;
    referralid: string;
    joiningdate: any;
    name: string;
    referal_link: string;
    walletbalance: number;
    walletpendingbalance: number;
    totalspotearnings: number;
    totalreferralearnings: number;
    totalinvestment: number;
  }



@Component({
    selector: 'app-account-summary',
    templateUrl: './account-summary.component.html',
    styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {
    public loading = false;

    public  summary: AccountSymmaryData ={
        uid: '',
    referralid: '',
    joiningdate: '', 
    name: '',
    referal_link: '',
    walletbalance: 0,
    walletpendingbalance:0,
    totalspotearnings: 0,
    totalreferralearnings:0,
    totalinvestment: 0
    };
    constructor(private as: AuthenticationService, private ds: DataService,    private router: Router) {


     }

    ngOnInit() {

    
        this.loading = true;
        this.ds.initalize();
           this.as.userProfile.subscribe((v)=>{
console.log(v);
if(v.profileupdated== true){
    this.loading = false;
    this.router.navigate(['/dashboard']);

}
else{
    this.loading= false;
    this.router.navigate(['/updateprofile']);
}
           });



        this.as.userAccountSummary.subscribe((summary) => {

            if (summary) {
                this.summary =summary;
                console.log("this summary");
                console.log(this.summary);

            }
        }) ;


       
        ////////////////////////*************chart logic ends */

    }


    cc(ts){


        (function(b,i,t,C,O,I,N) {
            window.addEventListener('load',function() {
              if(b.getElementById(C))return;
              I=b.createElement(i),N=b.getElementsByTagName(i)[0];
              I.src=t;I.id=C;N.parentNode.insertBefore(I, N);
            },false)
          })(document,'script','https://widgets.bitcoin.com/widget.js','btcwdgt');
    
        var d = new Date(ts);
       // return d.toLocaleString();
         return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
        
        }


}
