import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Livro } from './livro.model';
import { LivroService } from '../cardl/livro.service';
import { Subscription, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { UsuarioService } from 'src/app/auth/usuario.service';
@Component({
  selector: 'app-cardl',
  templateUrl: './cardl.component.html',
  styleUrls: ['./cardl.component.css']
})

export class CardlComponent implements OnInit, OnDestroy {
  public autenticado: boolean = false;
  private authObserver: Subscription;
  collection: Livro[] = [];
  private collectionsSubscription: Subscription;
  public estaCarregando = false;
  totalDeLivros: number = 0;
  totalDeLivrosPorPagina: number = 2;
  opcoesTotalDeLivrosPorPagina = [2, 5, 10];
  constructor(
  public livroService: LivroService,
  private usuarioService: UsuarioService ) {}
  ngOnDestroy(): void {
    this.collectionsSubscription.unsubscribe();
    this.authObserver.unsubscribe();
  }
  paginaAtual: number = 1; //definir

  ngOnInit(): void {

    this.estaCarregando = true;
    this.livroService.getLivros(this.totalDeLivrosPorPagina, this.paginaAtual);
    this.collectionsSubscription = this.livroService
    .getListaDeLivrosAtualizadaObservable()
    .subscribe((dados:{livro:[],maxLivros:number}) => {
      this.estaCarregando = false;
      this.collection = dados.livro;
      this.totalDeLivros = dados.maxLivros
    });
    this.autenticado = this.usuarioService.isAutenticado();
    this.authObserver = this.usuarioService
    .getStatusSubject().
    subscribe((autenticado) => this.autenticado = autenticado)
  }
  onPaginaAlterada (dadosPagina: PageEvent){
  // console.log (dadosPagina);
  this.estaCarregando = true;
  this.paginaAtual = dadosPagina.pageIndex + 1; //no paginator a contagem começa de 0
  this.totalDeLivrosPorPagina = dadosPagina.pageSize;
  this.livroService.getLivros (this.totalDeLivrosPorPagina, this.paginaAtual);
 }
  onDelete (id: string): void{
    this.estaCarregando = true;
    this.livroService.removerLivro(id).subscribe(() =>{
      this.livroService.getLivros(this.totalDeLivrosPorPagina,this.paginaAtual);
    });
  }
}
