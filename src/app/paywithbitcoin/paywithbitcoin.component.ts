import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-paywithbitcoin',
  templateUrl: './paywithbitcoin.component.html',
  styleUrls: ['./paywithbitcoin.component.css']
})
export class PaywithbitcoinComponent implements OnInit {

  constructor(private fb: FormBuilder, private ds : DataService, private router : Router) { }

  ngOnInit() {
  }

  

}
