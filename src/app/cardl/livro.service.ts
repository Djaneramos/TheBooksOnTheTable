import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})

export class LivroService {
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor (private httpClient: HttpClient){}

  getLivros(): void {
    this.httpClient.get <{mensagem: string, livros:any}>('http://localhost:3000/api/livros').pipe(map((dados) => {
        return dados.livros.map((livro) => {
        return{
          id:livro._id,
          titulo:livro.titulo,
          autor:livro.autor,
          npaginas:livro.npaginas
        }
        })
      }))
      .subscribe((livros) => {
        this.livros = livros;
        this.listaLivrosAtualizada.next([...this.livros]);
      })
  }
  adicionarLivro(titulo: string, autor: string, npaginas: string) {
    const livro: Livro = {
      id: null,
      titulo: titulo,
      autor: autor,
      npaginas: npaginas,
    };
    this.httpClient.post<{mensagem: string, id:string}> ('http://localhost:3000/api/livros',livro).subscribe((dados) => {
      console.log(dados.mensagem)
      livro.id = dados.id;
      this.livros.push (livro);
      this.listaLivrosAtualizada.next([...this.livros]);
    });
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }
  removerLivro (id: string): void{
  this.httpClient.delete(`http://localhost:3000/api/livros/${id}`).subscribe(() => {
  this.livros = this.livros.filter((liv) => {
  return liv.id !== id
 });
 this.listaLivrosAtualizada.next([...this.livros]);
 });
 }
 }
