import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchmap';

interface User{
  uid : string;
  email : string;
}
@Injectable()
export class AuthenticationService {

user : Observable<User>;


  constructor(private afAuth: AngularFireAuth,private router: Router) {
   }
   login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log(value);
      
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }

}
