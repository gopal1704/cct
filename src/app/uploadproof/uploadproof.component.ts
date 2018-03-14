import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { DataService } from '../data.service';


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
  constructor(private storage: AngularFireStorage, private ds: DataService) { }

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
    if (this.file) {

      const idproof = this.file.item(0);
      this.Profile = this.ds.get_profile_info().valueChanges().subscribe((v) => {

        this.fileuploadtask = this.storage.upload(v.email, idproof);

        this.downloadURL = this.fileuploadtask.downloadURL();

      });



    }

  }

}
