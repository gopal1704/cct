import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import {Router} from '@angular/router';

declare var Messenger : any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  public loading = false;

/***FORM DECLARATIONS */
SignUpForm : FormGroup;  // From Group Instance
UserName  : string;
Password  : string;
ReferralId : string;
/******************/

  constructor(private fb : FormBuilder, private as : AuthenticationService,private router: Router) {

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
     this.loading = true;

    console.log(Signupdata);
 var a = this.as.signup(Signupdata.UserName,Signupdata.Password,Signupdata.ReferralId);
a.then((v)=>{
 if(v){
  Messenger().post({
    message: ' Error creating account please try again with correct information ',
    type: 'error',
    showCloseButton: true
  });
console.log(v);
console.log('signup error');}
else{
  Messenger().post({
    message: 'Signup successful!',
    type: 'error',
    showCloseButton: true
  });
  setTimeout(() => {
    this.router.navigate(['/login']);

  }, 2500);
}
  this.loading = false;

}).catch((e)=>{
  this.loading = false;

  console.log(e)});
  }

}
