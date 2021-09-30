import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import {Customer} from "./user-list/customer";
import {ValutaRicoComponent} from './valuta-rico/valuta-rico.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudComponent } from './crud/crud.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {LoginGuard} from "./login.guard";
import {LogoutGuard} from "./logout.guard";
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ValutaRicoComponent,
    CrudComponent,
    LoginComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'list',
        component: CrudComponent,
        canActivate: [LoginGuard]
      },
      {path: 'valuta', component: ValutaRicoComponent},
      {path: 'login',
        component: LoginComponent,
        canActivate: [LogoutGuard]},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ])
  ],
  providers: [UserListComponent, Customer],
  bootstrap: [AppComponent]
})
export class AppModule { }
