import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import {editDocument} from './home/edit.component';
import { addDocument } from './home/app.component.Add';
import {NgbdSortableHeader} from './home/home.component';
import {showDocument} from './admin/show.component';

@NgModule({
  declarations: [
    AppComponent,
    NgbdSortableHeader,
    addDocument,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    editDocument,
    showDocument
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
