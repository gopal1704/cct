import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {

  constructor( private as : AuthenticationService) { }

  ngOnInit()
  {


this.as.user.subscribe(console.log,console.log,    () => console.log('completed'));
setTimeout(() => {
  console.log(this.as.currentUserId);

}, 5000);
  
  }


  
}
