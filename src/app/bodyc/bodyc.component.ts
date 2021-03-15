import { Component } from '@angular/core';

@Component({
  selector: 'app-bodyc',
  templateUrl: './bodyc.component.html',
  styleUrls: ['./bodyc.component.css']
})
export class BodycComponent  {
  id: string;
  titulo:string;
  autor: string;
  npaginas: string;
cadastrar(){
  alert("Livro cadastrado")
}
}
