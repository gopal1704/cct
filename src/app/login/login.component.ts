import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import {Router} from '@angular/router';
import {AngularFireAuth,AngularFireAuthProvider} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

declare var Messenger : any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading = false;

loggedin : boolean;
  /***FORM DECLARATIONS */
   LoginForm : FormGroup;  // From Group Instance
   UserName  : string;
   Password  : string;
  /******************/
  
  constructor( private fb : FormBuilder,private afAuth: AngularFireAuth,private router: Router, private as : AuthenticationService) { 


   this.LoginForm = fb.group({
      'UserName' : '',
      'Password' : ''

   });
  }

  ngOnInit() {
    this.loading = false;
console.log("init called");
    
  }

  Login(Credentials){
    this.loading = true;

//    console.log(Credentials);
//  this.as.login(Credentials.UserName,Credentials.Password);

  this.afAuth.auth.signInWithEmailAndPassword(Credentials.UserName, Credentials.Password)
.then(value => {


console.log("user logged in");
this.as.userLoggedIn= true;
this.router.navigate(['/dashboard']); 

})
.catch(err => {
  
this.loading= false;
Messenger().post({
  message: 'Error loggin in : Incorrect Email or Password',
  type: 'error',
  showCloseButton: true
});
  console.log('Something went wrong: ', err.message);
return false;
});


  }


}
