import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
declare var Messenger: any;

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
   CountryCodes : any;
   CountryCodesList : any;
  fileuploadtask: AngularFireUploadTask;
  downloadURL: any;
  file: any;
  /***FORM DECLARATIONS */
  UpdateProfileForm: FormGroup;  // From Group Instance
  public loading = false;

  Name: string;
  Dateofbirth: string;
  Gender: string;
  Mobile: string;
  Address: string;
  City: string;
  Country: string;
  Idproof: string = null;
  isdcode : string ;
  /******************/

  /***********************PROFILE OBJ */
  Profile: any;
  /************* */

  constructor(private http: HttpClient,private fb: FormBuilder, private router: Router,private as: AuthenticationService, private afs: AngularFirestore,
    private storage: AngularFireStorage) {



    this.UpdateProfileForm = fb.group({
      'displayname': [null,Validators.required],
      'title' : [null,Validators.required],
      'lastname': [null,Validators.required],
      'dob': [null,Validators.required],
      'gender': [null,Validators.required],
      'mobile': [null,Validators.required],
      'address': [null,Validators.required],
      'city': [null,Validators.required],
      'country': [null,Validators.required],
      'isdcode':''



    });
  }

  ngOnInit() {

this.CountryCodes = this.http.get('../../assets/CC.json');

this.CountryCodes.subscribe((v)=>{
  this.CountryCodesList = v;
  console.log(v)});
  }

  UpdateProfile(formdata) {
    this.loading = true;

console.log('form clicked');
    var t = formdata.dob;
    var time = new Date(t).getTime();
    formdata.dob = time;
    console.log(formdata);
    this.Profile = formdata;
    
    this.uploadIdProof('aaa', this.file);
  
  
  }

  handleFileInput(files: FileList) {


    this.file = files;
    console.log(files);



  }
  onchangecountry(value){
console.log(value);

for(var i=0;i<this.CountryCodesList.length;i++){
  
if(this.CountryCodesList[i].name === value){
  console.log(this.CountryCodesList[i].dial_code);
  this.isdcode = this.CountryCodesList[i].dial_code;
}


}
  }


  uploadIdProof(path, file) {
    if(file){
    const idproof = file.item(0);
    this.fileuploadtask = this.storage.upload('abc', idproof);
    
    this.downloadURL = this.fileuploadtask.downloadURL();
    

    this.downloadURL.subscribe((v) => {
        
      console.log(v);
      //profileupdated
      if(v){
      this.Profile.proofurl = v;}
      this.Profile.profileupdated = true;
      this.as.userAccountSummary.subscribe((v) => {

        //profileref
        var uid = v.uid;
        const userprofileref: AngularFirestoreDocument<any> = this.afs.doc(`users/${v.uid}`); //get the refrence for updating initial user data

        userprofileref.update(this.Profile).then((v) => {
          console.log(v);
          const usersummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${uid}`); //get the refrence for updating initial user data


          usersummaryref.update({name: this.Profile.title +' '+this.Profile.displayname +' '+ this.Profile.lastname}).then((v) => {
            if (!v) {

this.loading = false;
              Messenger().post({
                message: 'Profile accepted successfull!',
                type: 'success',
                showCloseButton: true
              });
              this.router.navigate(['/dashboard']);



            }
          });
        });
      })



    });

  }
  else{
    //no file
    
    this.Profile.profileupdated = true;
    
    this.as.userAccountSummary.subscribe((v) => {
   this.Profile.isdcode=this.isdcode;
      //profileref
      var uid = v.uid;
      const userprofileref: AngularFirestoreDocument<any> = this.afs.doc(`users/${v.uid}`); //get the refrence for updating initial user data

      userprofileref.update(this.Profile).then((v) => {
        console.log(v);
        const usersummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${uid}`); //get the refrence for updating initial user data


        usersummaryref.update({name: this.Profile.title +' '+this.Profile.displayname +' '+ this.Profile.lastname}).then((v) => {
          if (!v) {

this.loading= false;
            Messenger().post({
              message: 'Profile accepted successfull!',
              type: 'success',
              showCloseButton: true
            });
            this.router.navigate(['/dashboard']);



          }
        });
      });
    })




  }
    
  }//upload id proof

}
