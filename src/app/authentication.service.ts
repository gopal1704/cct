import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth,AngularFireAuthProvider} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw';
import { element } from 'protractor';

interface User{
  displayname : string;
  uid : string;
  email : string;
}
@Injectable()
export class AuthenticationService {
userLoggedIn = false;


user : Observable<User>;
currentUserId :  string;

  constructor(private afAuth: AngularFireAuth,private router: Router,
  private afs : AngularFirestore
  ) {
  this.user = this.afAuth.authState.switchMap(
    user => {
      if(user){
        this.currentUserId= user.uid;
        this.userLoggedIn = true;
        return this.afs.doc<User>(`accountsummary/${user.uid}`).valueChanges();
    
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
    this.router.navigate(['/dashboard']); 

  })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
    
  }
  logout(){
this.afAuth.auth.signOut();
this.userLoggedIn= false;
this.router.navigate(['']); 
  
}

}
