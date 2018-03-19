import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { GenericBrowserDomAdapter } from '@angular/platform-browser/src/browser/generic_browser_adapter';

declare var Messenger: any;

declare var moment : any;
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  CountryCodes : any;
  CountryCodesList : any;
  Profile : any;
  public loading : boolean = false;
  dob : any;
  gender : any;
  country : any;
  isdcode : any;
  mobile : any;
  address :any;
  city : any;
uid : any;
  //
  constructor(private ds : DataService,private router: Router,private http : HttpClient,private afs: AngularFirestore) { }

  ngOnInit() {
    this.CountryCodes = this.http.get('../../assets/CC.json');

this.CountryCodes.subscribe((v)=>{
  this.CountryCodesList = v;
  console.log(v)});

///
this.Profile= this.ds.get_profile_info().valueChanges();
console.log(this.Profile);
this.Profile.subscribe((v)=>{

  console.log(v.mobile);
this.country = v.country;
this.mobile = v.mobile;

this.gender = v.gender;
this.isdcode = v.isdcode;
this.address = v.address;
this.dob = this.cdob(v.dob);
this.city = v.city;
this.uid = v.uid;
})

////



  }
  cdob(d){
   var dd= new Date(d);
return moment(d).format('YYYY-MM-DD');
  }
  onchangecountry(value){
    console.log(value);
    
    for(var i=0;i<this.CountryCodesList.length;i++){
      
    if(this.CountryCodesList[i].name === value){
      console.log(this.CountryCodesList[i].dial_code);
      this.isdcode = this.CountryCodesList[i].dial_code;
    }
    
    
    }
      }
      UpdateProfile(){
        this.loading = true;
        console.log(this.gender);
        console.log(this.country);
        console.log(this.dob);
        const userprofileref: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.uid}`); //get the refrence for updating initial user data

        userprofileref.update({
        
          dob: this.dob,
          gender : this.gender, 
          country : this.country,
          isdcode : this.isdcode,
          mobile : this.mobile,
          address : this.address,

          city: this.city

        }).then(()=>{

        

this.loading = false;
          Messenger().post({
            message: 'Profile updated successfull!',
            type: 'success',
            showCloseButton: true
          });
        }).catch(e=>{
console.log(e);
this.loading = false;
          Messenger().post({
            message: 'error updating profile',
            type: 'success',
            showCloseButton: true
          });
        });
       

      }


}
