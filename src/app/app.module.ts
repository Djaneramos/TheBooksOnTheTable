import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import{MatInputModule} from '@angular/material/input';
import{MatCardModule}from'@angular/material/card';
import{MatButtonModule} from '@angular/material/button';
import{MatExpansionModule} from  '@angular/material/expansion';
import{ HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptor } from './auth/auth-interceptor'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodycComponent } from './bodyc/bodyc.component';
import { CardlComponent } from './cardl/cardl.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LivroService } from './cardl/livro.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodycComponent,
    CardlComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FormsModule,
  ],
  //providers: [LivroService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor}],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
