import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
  }

  auth(username: string, password: string) {
    this.http.get<User[]>('http://localhost:3000/users').pipe(
      tap((users: User[]) => {
          const user = users.filter(u => u.username === username && u.password === password)[0];
          if(user){
            localStorage.setItem('token', user.token);
            this.router.navigateByUrl('list')
          } else {
            alert('invalid user info')
          }
        }
      )
  ).subscribe()

  }
}


export interface User {
  username: string,
  password: string,
  token: string
}
