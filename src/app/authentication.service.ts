import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw';
import { element } from 'protractor';

interface User{
  uid : string;
  email : string;
}
@Injectable()
export class AuthenticationService {
userLoggedIn = false;


user : Observable<User>;


  constructor(private afAuth: AngularFireAuth,private router: Router,
  private afs : AngularFirestore
  ) {
  this.user = this.afAuth.authState.switchMap(
    user => {
      if(user){
        return this.afAuth.authState;
      }
else{
return Observable.of(null);
}
    }
  )
  
  
  }
    
   login(email: string, password: string) {
    
   var loginPromise =  this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
    this.userLoggedIn = true;
    console.log("user logged in");
    return value;

    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }

}
