import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import {CardlComponent} from './cardl/cardl.component'
import {BodycComponent}from './bodyc/bodyc.component'
const routes: Routes = [
  { path: '', component: CardlComponent },
  { path: 'criar', component: BodycComponent },
  { path: 'editar/:idLivro', component: BodycComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]

})
export class AppRoutingModule{

}
