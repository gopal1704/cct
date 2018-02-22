import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

declare var Messenger : any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

/***FORM DECLARATIONS */
SignUpForm : FormGroup;  // From Group Instance
UserName  : string;
Password  : string;
ReferralId : string;
/******************/

  constructor(private fb : FormBuilder, private as : AuthenticationService) {

    this.SignUpForm = fb.group({
      'UserName' : '',
      'Password' : '',
      'ReferralId': ''

   });

   }

  ngOnInit() {
    Messenger().post({
      message: 'There was an explosion while processing your request.',
      type: 'success',
      showCloseButton: true
    });
    
  }



  Signup(Signupdata){
    console.log(Signupdata);
 var a = this.as.signup(Signupdata.UserName,Signupdata.Password,Signupdata.ReferralId);
a.then((v)=>{
console.log(v);
console.log('signup successful');
}).catch((e)=>{console.log(e)});
  }

}
