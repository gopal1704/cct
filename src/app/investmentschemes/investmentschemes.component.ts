import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-investmentschemes',
  templateUrl: './investmentschemes.component.html',
  styleUrls: ['./investmentschemes.component.css']
})
export class InvestmentschemesComponent implements OnInit {

  constructor( private ds : DataService) { }

  ngOnInit() {

    
  }

}
