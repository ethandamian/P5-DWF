import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptorInterceptor } from './core/jwt-interceptor.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationModule } from './module/authentication/authentication.module';
import { CommonsModule } from './module/commons/commons.module';
import { NavbarComponent } from './module/layout/app-layout/navbar/navbar.component';
import { HomeComponent } from './module/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    CommonsModule
  ],
  providers: [provideHttpClient(withInterceptors([jwtInterceptorInterceptor]))],
  bootstrap: [AppComponent],

})
export class AppModule { }
