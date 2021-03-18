import { Component } from '@angular/core';
import {Book} from './cardl/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TheBooksOnTheTable';
  collection:Book[]=[];

  OnLivroAdd(book){
    this.collection=[...this.collection,book]
  }
}
