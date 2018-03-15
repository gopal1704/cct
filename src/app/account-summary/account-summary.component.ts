import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

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
    approvalstatus : string;
  }



@Component({
    selector: 'app-account-summary',
    templateUrl: './account-summary.component.html',
    styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {

    


    public loading = false;
public ip : any ;
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
    totalinvestment: 0,
    approvalstatus : ''
};
    constructor(private http: HttpClient,private as: AuthenticationService, private ds: DataService,    private router: Router) {


     }

    ngOnInit() {
      

        var y = firebase.firestore.FieldValue.serverTimestamp();
console.log(y);
this.ip = {
    ip : ""
}
    
        this.loading = true;
        this.ds.initalize();
           this.as.userProfile.subscribe((v)=>{
console.log(v);
if(v.profileupdated== true){
    this.loading = false;
     var result = this.http.get(`https://catcotrade.com/getip`);
    result.subscribe((v)=>{
  this.ip=v;
      console.log(v);
    });

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

        
        var d = new Date(ts);
       // return d.toLocaleString();
         return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
        
        }


}
