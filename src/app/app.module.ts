import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodycComponent } from './bodyc/bodyc.component';
import { CardlComponent } from './cardl/cardl.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodycComponent,
    CardlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
