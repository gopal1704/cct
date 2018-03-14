import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Profile : any;
  constructor(private ds : DataService,private router: Router) { 

  }

  ngOnInit() {
   this.Profile= this.ds.get_profile_info().valueChanges();
   console.log(this.Profile);
  //  var item = itemdoc.valueChanges().subscribe((v)=>{console.log(v);
  //   return v;
  }
  converttimestampdob(ts){
    var d = new Date(ts);
   // return d.toLocaleString();
     return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    
    }
    converttimestamp(ts){
      var d = new Date(ts);
      return d.toLocaleString();
      // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
      
      }
      gotoupload(){

      }


}
