import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Output,EventEmitter } from '@angular/core';
import {Book} from '../cardl/book.model';

@Component({
  selector: 'app-bodyc',
  templateUrl: './bodyc.component.html',
  styleUrls: ['./bodyc.component.css']
})
export class BodycComponent  {
  @Output()livroAdd = new EventEmitter<Book>()

  id: string;
  titulo:string;
  autor: string;
  npaginas: string;
  OnLivroAdd(){
    const livro:Book={
      id:this.id,
      titulo:this.titulo,
      autor:this.autor,
      npaginas:this.npaginas,
    }
    this.livroAdd.emit(livro)
}
}
