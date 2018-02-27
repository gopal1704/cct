import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  Investments: any;
  constructor(private ds: DataService, private authservice: AuthenticationService) { }

  ngOnInit() {

    this.authservice.userAccountSummary.subscribe(
      (summarydata) => {

        if (summarydata) {
          var uid = summarydata.uid;


          this.ds.get_investments(uid).subscribe((v) => {
            this.Investments = v;
            console.log(v)
          });


        }
      }
    );

  }

}
