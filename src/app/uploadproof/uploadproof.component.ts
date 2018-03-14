import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { DataService } from '../data.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';


declare var Messenger: any;

@Component({
  selector: 'app-uploadproof',
  templateUrl: './uploadproof.component.html',
  styleUrls: ['./uploadproof.component.css']
})
export class UploadproofComponent implements OnInit {
  file: any;
  Profile: any;
  fileuploadtask: AngularFireUploadTask;
  downloadURL: any;
  proceed: boolean;
  loading : any;
  constructor(private storage: AngularFireStorage,private router: Router, private ds: DataService,    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.proceed = false;
  }

  handleFileInput(files: FileList) {


    this.file = files;
    console.log(files);

    if (files.item(0)) {
      this.proceed = true;
    }
    else {
      this.proceed = false;
    }

  }

  uploadIdProof() {
    this.loading= true;
    if (this.file) {

      const idproof = this.file.item(0);
      this.Profile = this.ds.get_profile_info().valueChanges().take(1).subscribe((v) => {

        this.fileuploadtask = this.storage.upload(v.email, idproof);

        this.downloadURL = this.fileuploadtask.downloadURL();
          

        this.downloadURL.subscribe((url)=>{



          if(url){
          const userprofileref: AngularFirestoreDocument<any> = this.afs.doc(`users/${v.uid}`); //get the refrence for updating initial user data


          userprofileref.update({
            proofurl : url
          }).then((v)=>{
            this.loading = false;
            Messenger().post({
              message: 'Profile accepted successfull!',
              type: 'success',
              showCloseButton: true
            });
            this.router.navigate(['/dashboard']);


          }).catch(()=>{
            this.loading= false;
            Messenger().post({
              message: 'Error uploading proof.',
              type: 'error',
              showCloseButton: true
            });
          })

        }
        else{
          this.loading = false;
          Messenger().post({
            message: 'Error uploading proof.',
            type: 'error',
            showCloseButton: true
          });
        }


        });////
        
      

      });



    }

  }

}
