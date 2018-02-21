import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loggedin : boolean;
  /***FORM DECLARATIONS */
   LoginForm : FormGroup;  // From Group Instance
   UserName  : string;
   Password  : string;
  /******************/

  constructor( private fb : FormBuilder, private as : AuthenticationService) { 


   this.LoginForm = fb.group({
      'UserName' : '',
      'Password' : ''

   });
  }

  ngOnInit() {

    
  }

  Login(Credentials){
   console.log(Credentials);
 this.loggedin = this.as.login(Credentials.UserName,Credentials.Password);
  this.router.navigate(['dashboard']); 
  }


}
