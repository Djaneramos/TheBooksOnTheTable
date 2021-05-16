import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})

export class LivroService {
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  constructor (private httpClient: HttpClient, private router: Router){}

  getLivro (idLivro: string){
    //return {...this.livros.find((liv) => liv.id === idLivro)};
    return this.httpClient.get<{_id: string, titulo: string, autor: string, npaginas: string}>(`http://localhost:3000/api/livros/${idLivro}`);
  }

  getLivros(): void {
    this.httpClient
    .get <{mensagem: string, livros:any}>(
      'http://localhost:3000/api/livros')
      .pipe(map((dados) => {
        return dados.livros.map(livro => {
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

  atualizarLivro (id: string, titulo: string, autor: string, npaginas: string ) {
    const livro: Livro = {id, titulo, autor, npaginas};
    this.httpClient.put(`http://localhost:3000/api/livros/${id}`, livro)
    .subscribe((res => {
      const copia = [...this.livros];
      const indice = copia.findIndex(liv => liv.id === livro.id);
      copia[indice] = livro;
      this.livros = copia;
      this.listaLivrosAtualizada.next([...this.livros]);
      this.router.navigate(['/'])
    }));
  }

  adicionarLivro(titulo: string, autor: string, npaginas: string) {
    const livro: Livro = {
      id: null,
      titulo: titulo,
      autor: autor,
      npaginas: npaginas,
    };
    this.httpClient.post<{mensagem: string, id:string}> ('http://localhost:3000/api/livros',livro).subscribe((dados) => {
      livro.id = dados.id;
      this.livros.push (livro);
      this.listaLivrosAtualizada.next([...this.livros]);
      this.router.navigate(['/']);
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
