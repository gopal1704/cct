import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
public Transactions;

  constructor(private as: AuthenticationService, private ds: DataService) { }

  ngOnInit(  ) {
    this.ds.initalize();
this.as.userAccountSummary.take(1).subscribe((v)=>{

  console.log('transactions');
  console.log(v);
this.ds.get_transactions(v.uid).subscribe((v)=>{
this.Transactions = v;
console.log(v);
});
  
});   
  


}
test1(){
  this.ds.send_monthly_bonus();
}



converttimestamp(ts){
var d = new Date(ts);
 return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();

}

}
