import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
   public DisplayName;
  constructor( private as : AuthenticationService ,private router: Router) { }

  ngOnInit() {
      if(this.as.userLoggedIn==true)
{
    this.as.user.subscribe((user)=>{
      if(user){
this.DisplayName = user.displayname;}
    },()=>{


    });
  }
  else{
    this.router.navigate(['']); 

  }

  }
  logout(){

    this.as.logout();
    
  }


}
