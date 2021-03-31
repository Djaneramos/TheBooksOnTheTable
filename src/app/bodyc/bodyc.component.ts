import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LivroService } from '../cardl/livro.service';

@Component({
  selector: 'app-bodyc',
  templateUrl: './bodyc.component.html',
  styleUrls: ['./bodyc.component.css']
})
export class BodycComponent {

  constructor(public livroService: LivroService) {}

  OnLivroAdd(form: NgForm) {

    if(form.invalid) {
      return;
    }

    this.livroService.adicionarLivro(
      form.value.id,
      form.value.titulo,
      form.value.autor,
      form.value.npaginas,
    );

    form.resetForm();
  }
}
