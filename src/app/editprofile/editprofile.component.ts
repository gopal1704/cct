import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  CountryCodes : any;
  CountryCodesList : any;

  //
  dob : any;
  gender : any;
  country : any;
  isdcode : any;
  moblie : any;
  address :any;
  city : any;

  //
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.CountryCodes = this.http.get('../../assets/CC.json');

this.CountryCodes.subscribe((v)=>{
  this.CountryCodesList = v;
  console.log(v)});
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
        console.log(this.gender);
        console.log(this.country);
        console.log(this.dob);
      }


}
