import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {AuthenticationService} from './authentication.service';
import {DataService} from './data.service'
interface Post{
  title:string;
  content :string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  postCol : AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  title = 'app';
  
  constructor(private afs:AngularFirestore, private authService: AuthenticationService, private dataService : DataService) {

  }

p = function(data){
console.log(data);
   }
ngOnInit(){

this.dataService.get_accountsummary("aa");

}

}
