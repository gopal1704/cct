import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { start } from 'repl';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  Investments: any;
  usersearchForm : FormGroup;
 public  uid ;

  constructor(private ds: DataService, private authservice: AuthenticationService,private fb: FormBuilder,private afs: AngularFirestore) { }

  ngOnInit() {

    this.usersearchForm = this.fb.group({
      'search': '',
      'type': '',
      'from':'',
      'to' : ''
      

    });


    this.authservice.userAccountSummary.subscribe(
      (summarydata) => {

        if (summarydata) {
          var uid = summarydata.uid;
          this.uid = summarydata.uid; 

          this.ds.get_investments(uid).subscribe((v) => {
            this.Investments = v;
            console.log(v)
          });


        }
      }
    );

  }
  converttimestamp(ts){
    var d = new Date(ts);
    return d.toLocaleString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
    
    }
 calculateenddate(ts,days){
var d = new Date(ts);
d.setDate(d.getDate()+ parseInt(days));
return this.converttimestamp(d);
 }

 calculatew(startdatets,duration){
var sdts = startdatets;
var sd = new Date(startdatets);
var ed = sd.getDate()+parseInt(duration);

console.log(sd,ed);
  
  console.log(duration);
return '50%';
 }
 gettime(){
  var d =  new Date();
  return this.converttimestamp(d.getTime());


 }
search(formdata){
 
  var invest = this.afs.collection('investments', ref => {
    return ref.where('uid' , '==' ,this.uid).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.Investments = v;
  });
}


}
