import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Livro } from './livro.model';
import { LivroService } from '../cardl/livro.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-cardl',
  templateUrl: './cardl.component.html',
  styleUrls: ['./cardl.component.css']
})

export class CardlComponent implements OnInit, OnDestroy {

  collection: Livro[] = [];
  private collectionsSubscription: Subscription;
  public estaCarregando = false;

  constructor(public livroService: LivroService ) {}


  ngOnInit(): void {
    this.estaCarregando = true;
    this.livroService.getLivros();
    this.collectionsSubscription = this.livroService
    .getListaDeLivrosAtualizadaObservable()
    .subscribe((collection: Livro[]) => {
      this.estaCarregando = false;
      this.collection = collection;
    });
  }

  onDelete (id: string): void{
    this.livroService.removerLivro(id);
  }

  ngOnDestroy(): void {
    this.collectionsSubscription.unsubscribe();
  }
}
