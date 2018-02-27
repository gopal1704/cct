import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  fileuploadtask: AngularFireUploadTask;
  downloadURL: any;
  file: any;
  /***FORM DECLARATIONS */
  UpdateProfileForm: FormGroup;  // From Group Instance

  Name: string;
  Dateofbirth: string;
  Gender: string;
  Mobile: string;
  Address: string;
  City: string;
  Country: string;
  Idproof: string = null;
  /******************/

/***********************PROFILE OBJ */
Profile : any;
/************* */

  constructor(private fb: FormBuilder,private as : AuthenticationService,    private afs: AngularFirestore,
    private storage: AngularFireStorage) {



    this.UpdateProfileForm = fb.group({
      'Name': '',
      'Dateofbirth': '',
      'Gender': '',
      'Mobile': '',
      'Address': '',
      'City': '',
      'Country': '',


    });
  }

  ngOnInit() {

  }

  UpdateProfile(formdata) {

    var t = formdata.Dateofbirth;
    var time = new Date(t).getTime();
    formdata.Dateofbirth = time;
    console.log(formdata);
    this.uploadIdProof('aaa',this.file);
  this.Profile = formdata;
  }

  handleFileInput(files: FileList) {


    this.file = files;
    console.log(files);



  }
uploadIdProof(path , file){

const idproof = file.item(0);
this.fileuploadtask =this.storage.upload('abc',idproof);
this.downloadURL = this.fileuploadtask.downloadURL();

this.downloadURL.subscribe((v)=>{
console.log(v);
//profileupdated
this.Profile.proofurl = v;
this.as.userAccountSummary.subscribe((v)=>{

//profileref

const userprofileref: AngularFirestoreDocument<any> = this.afs.doc(`users/${v.uid}`); //get the refrence for updating initial user data


})



});
}

}
