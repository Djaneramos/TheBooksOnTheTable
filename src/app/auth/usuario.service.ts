import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private autenticado: boolean = false;
  private token: string;
  private authStatusSubject = new Subject<boolean>();
  public getToken (): string{
  return this.token;
}
public getStatusSubject (){
 return this.authStatusSubject.asObservable();
}
public isAutenticado() : boolean{
return this.autenticado;
}
  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) {
}
criarUsuario (email: string, senha: string){
  const authData: AuthData = {
    email: email,
    password: senha
  }
  this.httpClient.post("http://localhost:3000/api/usuario/signup",
  authData).subscribe(resposta => {
    console.log(resposta)
  });
}
login (email: string, senha: string){
  const authData: AuthData = {
    email: email,
    password: senha
  }
  this.httpClient.post<{token: string}>("http://localhost:3000/api/usuario/login",
   authData).subscribe(resposta => {
    console.log(resposta)
    this.token = resposta.token;
    if (this.token){
    this.autenticado = true;
    this.authStatusSubject.next(true);
    this.router.navigate(['/'])
    }
  });
}
logout(){
  this.token = null;
  this.authStatusSubject.next(false);
  this.router.navigate(['/'])
}
}
