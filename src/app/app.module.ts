import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule} from '@angular/forms';

import{MatInputModule} from '@angular/material/input';
import{MatCardModule}from'@angular/material/card';
import{MatButtonModule} from '@angular/material/button';
import{MatExpansionModule} from  '@angular/material/expansion';
import{ HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodycComponent } from './bodyc/bodyc.component';
import { CardlComponent } from './cardl/cardl.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LivroService } from './cardl/livro.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodycComponent,
    CardlComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
  ],
  providers: [LivroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
