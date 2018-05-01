import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit {
   public Referrals;
   public length;
   public startPointer;
   public endPointer;


  constructor(private ds: DataService,    private authservice: AuthenticationService,
  ) { }

  ngOnInit() {
    this.ds.initalize();
    this.authservice.userAccountSummary.subscribe(
      (summarydata) => {

        if (summarydata) {
          var uid = summarydata.uid;
 

        var doc=  this.ds.get_referrals(uid).valueChanges().subscribe((v)=>{
            this.Referrals = v;
            console.log(v)});
        


        }
      }
    );
  
  
  }
  converttimestamp(ts){
    var d = new Date(ts);
    return d.toLocaleString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
    
    }

}
