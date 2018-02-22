import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

declare var Messenger : any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private as : AuthenticationService) {

   }

  ngOnInit() {
    Messenger().post({
      message: 'There was an explosion while processing your request.',
      type: 'success',
      showCloseButton: true
    });
    
  }

}
