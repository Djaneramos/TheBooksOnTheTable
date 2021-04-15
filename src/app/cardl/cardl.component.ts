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

  constructor(public livroService: LivroService ) {}

  ngOnDestroy(): void {
    this.collectionsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.livroService.getLivros();
    this.collectionsSubscription = this.livroService
    .getListaDeLivrosAtualizadaObservable()
    .subscribe((collection: Livro[]) => {
      this.collection = collection;
    });
  }

}
