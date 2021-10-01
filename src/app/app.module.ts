import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './features/user-list/user-list.component';
import {Customer} from "./features/user-list/customer";
import {ValutaRicoComponent} from './features/valuta-rico/valuta-rico.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudComponent } from './features/crud/crud.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import {LoginGuard} from "./auth/guards/login.guard";
import {LogoutGuard} from "./auth/guards/logout.guard";
import { NavbarComponent } from './features/navbar/navbar.component';
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ValutaRicoComponent,
    CrudComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
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
