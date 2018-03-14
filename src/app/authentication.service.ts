import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw';
import { element } from 'protractor';
import { emit } from 'cluster';
import { ProfileComponent } from './profile/profile.component';

interface User {
  displayname: string;
  uid: string;
  email: string;
}
interface ProfileData {

  displayname: string;
  uid: string;
  email: string;
  profileupdated: boolean;
  referralid: string;
  dob: any;
  address: string;
  city: string;
  country: string;
  mobile: string;
  dateofjoining: any;
  gender: string;
  proofurl :string;
}
interface AccountSymmaryData {
  uid: string;
  referralid: string;
  joiningdate: any;
  name: string;
  referal_link: string;
  walletbalance: number;
  walletpendingbalance: number;
  totalspotearnings: number;
  totalreferralearnings: number;
  totalinvestment: number;
  approvalstatus : string;
  transaction : boolean;

}
@Injectable()
export class AuthenticationService {
  userLoggedIn = false;


  user: Observable<User>;
  userAccountSummary: Observable<AccountSymmaryData>;
 userProfile : Observable<any>;
  currentUserId: string;
currentUser : any;
  constructor(private afAuth: AngularFireAuth, private router: Router,
    private afs: AngularFirestore
  ) {
    
    this.userAccountSummary = this.afAuth.authState.switchMap(
      user => {
        if (user) {
          this.currentUser = user;
          this.currentUserId = user.uid;
          this.userLoggedIn = true;

          return this.afs.doc<AccountSymmaryData>(`accountsummary/${user.uid}`).valueChanges();

        }
        else {
          return Observable.of(null);

        }
      }
    );

this.userProfile =  this.afAuth.authState.switchMap(
  user => {
    if (user) {
      this.currentUserId = user.uid;
      this.userLoggedIn = true;
      return this.afs.doc<AccountSymmaryData>(`users/${user.uid}`).valueChanges();

    }
    else {
      return Observable.of(null);

    }
  }
);

  }

  login(email: string, password: string) {


  }

  signup(email: string, password: string, referralid: string) {

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      user => {
        user.sendEmailVerification().then(function() {
console.log('verification email sent!');
        }).catch(function(error) {
console.log('error sending verification email');
        });
                return this.setUserProfileandSummary(user, referralid);
      }
    ).catch(error => {
      console.log(error)
      return error;
    });

  }



  logout() {
    this.afAuth.auth.signOut();
    this.userLoggedIn = false;
    this.router.navigate(['']);

  }
  private setUserProfileandSummary(user, referralid) {
    if (!referralid) {
      referralid = 'root';
    }
    const userref: AngularFirestoreDocument<ProfileData> = this.afs.doc(`users/${user.uid}`); //get the refrence for updating initial user data

    const usersummaryref: AngularFirestoreDocument<AccountSymmaryData> = this.afs.doc(`accountsummary/${user.uid}`); //get the refrence for updating initial user data

    const ProfileData = {
      displayname: '',
      uid: user.uid,
      email: user.email,
      profileupdated: false,
      referralid: referralid,
      dob: 0,
      address: '',
      city: '',
      country: '',
      mobile: '',
      dateofjoining: Date.now(),
      gender: '',
      proofurl  : ''
    };
    const AccountSymmaryData = {
      uid: user.uid,
      referralid: referralid,
      joiningdate: Date.now(),
      name: '',
      referal_link: 'http://dashboard.catcotrade.info/signup/' + user.uid,
      walletbalance: 0,
      walletpendingbalance: 0,
      totalspotearnings: 0,
      totalreferralearnings: 0,
      totalinvestment: 0,
      approvalstatus : "pending",
      transaction : false

    };
    return userref.set(ProfileData).then(() => {
      return usersummaryref.set(AccountSymmaryData)
    });

  }




}
