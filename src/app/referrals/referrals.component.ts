import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


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
public uid;
   usersearchForm : FormGroup;

  constructor(private ds: DataService,private afs: AngularFirestore,  private fb: FormBuilder,  private authservice: AuthenticationService,
  ) { 


  }

  ngOnInit() {

    this.usersearchForm = this.fb.group({
      'search': '',
      'type': '',
      'from':'',
      'to' : ''
      

    });
    this.ds.initalize();
    this.authservice.userAccountSummary.subscribe(
      (summarydata) => {

        if (summarydata) {
          var uid = summarydata.uid;
 this.uid = summarydata.uid;

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
    search(formdata){
 console.log(formdata);
      var invest = this.afs.collection('accountsummary', ref => {
        return ref.where('referralid' , '==' ,this.uid).where("joiningdate", ">=", new Date(formdata.from)).where("joiningdate", "<=", new Date(formdata.to));
      });
      
      invest.valueChanges().subscribe((v)=>{
      this.Referrals = v;
      });
    }
    

}
