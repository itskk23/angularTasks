import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './features/user-list/user-list.component';
import {Customer} from "./features/user-list/customer";
import { HttpClientModule } from '@angular/common/http';
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
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    RouterModule.forRoot([
      //ლოგინ მოდულს აღარ გავუკეთე ლეიზი ლოუდი. რაც შეეხება იუზერ-ლისტს, ძველი დავალებაა ეგ და აზრი არ ჰქონდა შევეშვი
      {path: 'list',
        canActivate: [LoginGuard],
        loadChildren: () => import('./features/crud/crud.module').then(m => m.CrudModule)
      },
      {path: 'user-list',
      component: UserListComponent},
      {path: 'valuta',
        loadChildren: () => import('./features/valuta-rico/valute.module').then(m => m.ValuteModule),},
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
