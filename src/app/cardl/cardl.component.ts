import { Component,Input} from '@angular/core';
import {Book} from '../cardl/book.model';

@Component({
  selector: 'app-cardl',
  templateUrl: './cardl.component.html',
  styleUrls: ['./cardl.component.css']
})
export class CardlComponent  {
  @Input() collection:Book[]=[]
}
