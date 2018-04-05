import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
public Transactions;
public length;
public startPointer;
public endPointer;
usersearchForm : FormGroup;
public uid;
  constructor(private as: AuthenticationService, private ds: DataService,private fb: FormBuilder,private afs: AngularFirestore) { }

  ngOnInit(  ) {

    this.usersearchForm = this.fb.group({
      'search': '',
      'type': '',
      'ttype' : '',
      'from':'',
      'to' : ''
      

    });
    this.ds.initalize();
this.as.userAccountSummary.take(1).subscribe((v)=>{
this.uid = v.uid;
  this.ds.get_transactions(v.uid).subscribe((v)=>{
    this.Transactions = v;
    
    });

  console.log('transactions');
  console.log(v);





// .subscribe((v)=>{
// this.Transactions = v;
// console.log(v);
// });
  
});   
  


}
test1(){
  this.ds.send_monthly_bonus();
}



converttimestamp(ts){
var d = new Date(ts);
return d.toLocaleString();
// return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();

}

search(formdata){

  console.log(formdata);

console.log(this.uid);
if( formdata.ttype!=""){
//if user id enter all fields
var invest = this.afs.collection('transactions', ref => {
return ref.where('uid', '==', this.uid).where('type', '==', formdata.ttype).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
});

invest.valueChanges().subscribe((v)=>{
this.Transactions = v;

});

}




}

}
