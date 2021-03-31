import { Livro } from './livro.model';
import { Subject } from 'rxjs';


export class LivroService {
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject<Livro[]>();

  getLivros(): Livro[] {
    return [...this.livros];
  }

  adicionarLivro(id: string, titulo: string, autor: string, npaginas: string) {
    const livro: Livro = {
      id: id,
      titulo: titulo,
      autor: autor,
      npaginas: npaginas,
    };
    this.livros.push(livro);
    this.listaLivrosAtualizada.next([...this.livros]);
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }

}
