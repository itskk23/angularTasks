import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "../../shared/entities/user.entity";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
  }

  auth(username: string, password: string) {
    this.http.get<User[]>('http://localhost:3000/data').pipe(
      tap((users: User[]) => {
          const user = users.filter(u => u.employee_name === username && u.password === password)[0];
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



