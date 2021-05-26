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
  private listaLivrosAtualizada = new Subject<{livro:Livro[],maxLivros:number}>();

  constructor (private httpClient: HttpClient, private router: Router){}

  getLivro (idLivro: string){
    //return {...this.livros.find((liv) => liv.id === idLivro)};
    return this.httpClient.get<{_id: string, titulo: string, autor: string, npaginas: string, imagemURL: string}>(`http://localhost:3000/api/livros/${idLivro}`);
  }

  getLivros(pagesize: number, page: number): void {
    const parametros = `?pagesize=${pagesize}&page=${page}`;
    this.httpClient.get <{mensagem: string, livros:any,maxLivros:
      number}>('http://localhost:3000/api/livros'+ parametros)
      .pipe(map((dados) => {
        return {
          livros:dados.livros.map(livro => {
        return{
          id:livro._id,
          titulo:livro.titulo,
          autor:livro.autor,
          npaginas:livro.npaginas,
          imagemURL: livro.imagemURL
        }
      }),
      maxLivros: dados.maxLivros
    }
    }))
    .subscribe((dados) => {
      this.livros = dados.livros;
      this.listaLivrosAtualizada.next({
        livro:[...this.livros],
        maxLivros: dados.maxLivros
      });
    })
  }

  atualizarLivro (id: string, titulo: string, autor: string, npaginas: string,imagem: File | string) {
   // const livro: Livro = {id, titulo, autor, npaginas,imagemURL: null};
   let livroData: Livro | FormData ;
   if (typeof(imagem) === 'object'){// é um arquivo, montar um form data
   livroData = new FormData();
   livroData.append("id", id);
   livroData.append('titulo', titulo);
   livroData.append('autor', autor);
   livroData.append("npaginas", npaginas);
   livroData.append('imagem', imagem, titulo);//chave, foto e nome para o arquivo
   }else{
    //enviar JSON comum
    livroData = {
    id: id,
    titulo: titulo,
    autor: autor,
    npaginas: npaginas,
    imagemURL: imagem
     }
    }

    console.log (typeof(livroData));
    this.httpClient.put(`http://localhost:3000/api/livros/${id}`, livroData)
    .subscribe((res => {
      this.router.navigate(['/'])
    }));
  }

  adicionarLivro(titulo: string, autor: string, npaginas: string,imagem: File) {
   /* const livro: Livro = {
      id: null,
      titulo: titulo,
      autor: autor,
      npaginas: npaginas,
    };*/
    const dadosLivro = new FormData();
    dadosLivro.append('titulo', titulo);
    dadosLivro.append('autor', autor);
    dadosLivro.append('npaginas', npaginas);
    dadosLivro.append('imagem', imagem);

    this.httpClient.post<{mensagem: string, livro:Livro}> ('http://localhost:3000/api/livros',dadosLivro).subscribe(
      (dados) => {
      this.router.navigate(['/']);
    });
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }

  removerLivro (id: string){
    return this.httpClient.delete(`http://localhost:3000/api/livros/${id}`);
  }
   /* .subscribe(() => {
    this.livros = this.livros.filter((liv) => {
    return liv.id !== id
    });
    this.listaLivrosAtualizada.next([...this.livros]);
    });
  }*/
 }
