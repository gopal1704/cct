import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-adminwithdrawal',
  templateUrl: './adminwithdrawal.component.html',
  styleUrls: ['./adminwithdrawal.component.css']
})
export class AdminwithdrawalComponent implements OnInit {

  constructor(private ds :DataService) { }

  ngOnInit() {
   // console.log(this.ds.get_admin_withdrawal());

    this.ds.get_admin_withdrawal().subscribe((v)=>{
console.log(v)
    })
  }

}
