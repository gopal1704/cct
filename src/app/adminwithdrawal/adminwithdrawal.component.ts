import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
declare var $ : any;

@Component({
  selector: 'app-adminwithdrawal',
  templateUrl: './adminwithdrawal.component.html',
  styleUrls: ['./adminwithdrawal.component.css']
})
export class AdminwithdrawalComponent implements OnInit {
 public withdrawal : any;
 public c_withdraw_details : any;
 public details : string ;
  constructor(private ds :DataService) { }

  ngOnInit() {
   // console.log(this.ds.get_admin_withdrawal());

    this.ds.get_admin_withdrawal().subscribe((v)=>{
console.log(v);
this.withdrawal = v;
    })
  }

converttimestamp(ts){
  var d = new Date(ts);
  return d.toLocaleString();
  // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
  
  }
approve(){


var a =this.ds.approve_withdrawal_request(this.c_withdraw_details.id,this.c_withdraw_details.uid,this.c_withdraw_details.amount,this.details);

if(a){

}

}

detailsmodal(id,uid,amount){
  this.c_withdraw_details = {
    id : id,
    uid : uid,
    amount : amount
  }
  $('#tdetails').modal({show:true});


}

}
