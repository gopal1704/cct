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
file : any;
Profile :any;
fileuploadtask: AngularFireUploadTask;
  downloadURL: any;
constructor(private storage: AngularFireStorage,private ds : DataService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {


    this.file = files;
    console.log(files);



  }

  uploadIdProof() {
    if(this.file){
    const idproof = this.file.item(0);
    this.Profile= this.ds.get_profile_info().valueChanges();

    this.fileuploadtask = this.storage.upload('abc', idproof);
    
    this.downloadURL = this.fileuploadtask.downloadURL();

    }

  }

}
