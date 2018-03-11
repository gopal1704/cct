import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wallettransferotp',
  templateUrl: './wallettransferotp.component.html',
  styleUrls: ['./wallettransferotp.component.css']
})
export class WallettransferotpComponent implements OnInit {

  constructor(private http :HttpClient ,private ds : DataService,private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router, private as: AuthenticationService) { }

  WalletTransferOtp : FormGroup;  // From Group Instance
  otp : any;
  

  ngOnInit() {
  }

}
