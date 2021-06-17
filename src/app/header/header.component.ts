
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../auth/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  private authObserver: Subscription;
  public autenticado: boolean = false;
  constructor(
  private usuarioService: UsuarioService
  ) { }
  ngOnInit(): void {
    this.authObserver =
    this.usuarioService.getStatusSubject().
    subscribe((autenticado) => {
      this.autenticado = autenticado;
    })
  }
  ngOnDestroy(){
    this.authObserver.unsubscribe();
  }
  onLogout(){
  this.usuarioService.logout();
}
}



