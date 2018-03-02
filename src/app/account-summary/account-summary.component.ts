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


        /*****************CHART STARTS */
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    label: 'USD',
                    data: [2000, 2155, 3000, 4000, 4500, 5000],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        ////////////////////////*************chart logic ends */

    }
    cc(ts){
        var d = new Date(ts);
       // return d.toLocaleString();
         return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
        
        }


}
