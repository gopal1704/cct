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
import { emit } from 'cluster';
import { ProfileComponent } from './profile/profile.component';

interface User{
  displayname : string;
  uid : string;
  email : string;
}
interface ProfileData{
  displayname : string;
  uid : string;
  email : string;
  profileupdated :boolean;
  referralid : string;
}
interface AccountSymmaryData{

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
  
    
  }

  signup(email : string, password : string, referralid : string){

 return  this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(
  user=>{
        return this.setUserProfileandSummary(user,referralid);
  }
).catch(error => {console.log(error)});
         
  }



  logout(){
this.afAuth.auth.signOut();
this.userLoggedIn= false;
this.router.navigate(['']); 
  
}
private setUserProfileandSummary(user,referralid){

const userref : AngularFirestoreDocument<ProfileData> = this.afs.doc(`users/${user.uid}`); //get the refrence for updating initial user data

const usersummaryref :AngularFirestoreDocument<User> = this.afs.doc(`accountsummary/${user.uid}`); //get the refrence for updating initial user data

const ProfileData ={
  displayname : '',
  uid : user.uid,
  email : user.email,
  profileupdated : false,
  referralid : referralid

}
return userref.set(ProfileData);

}




}
