import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})

export class LivroService {
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor (private httpClient: HttpClient){}

  getLivros(): void {
    this.httpClient
      .get <{mensagem: string, livros: Livro[]}>(
        'http://localhost:3000/api/livros'
      ).subscribe((dados) => {
        this.livros = dados.livros;
        this.listaLivrosAtualizada.next([...this.livros]);
      })
  }


  adicionarLivro(id: string, titulo: string, autor: string, npaginas: string) {
    const livro: Livro = {
      id: id,
      titulo: titulo,
      autor: autor,
      npaginas: npaginas,
    };
    this.httpClient.post<{mensagem: string}> ('http://localhost:3000/api/livros', livro).subscribe((dados) => {
      this.livros.push(livro);
      this.listaLivrosAtualizada.next([...this.livros]);
    });
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }

}
