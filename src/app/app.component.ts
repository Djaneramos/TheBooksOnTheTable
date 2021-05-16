import { Component } from '@angular/core';
import {Livro} from './cardl/livro.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TheBooksOnTheTable';
  collection:Livro[]=[];

  OnLivroAdd(livro){

    const newLivro = { ...livro, id: this.collection.length + 1 };
    this.collection=[...this.collection, livro];
  }
}
