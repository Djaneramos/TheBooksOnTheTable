import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';

import {CardlComponent} from './cardl/cardl.component'
import {BodycComponent}from './bodyc/bodyc.component'
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
const routes: Routes = [
  { path: '', component: CardlComponent },
  { path: 'criar', component: BodycComponent },
  { path: 'editar/:idLivro', component: BodycComponent },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
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
