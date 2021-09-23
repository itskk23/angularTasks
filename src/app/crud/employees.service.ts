import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/data/')
  }

  getEmployeeById(id): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/data/${id}`)
  }
  addEmployee(user): Observable<User[]> {
    return this.http.post<User[]>(`http://localhost:3000/data/`, user)
  }
}


export interface  User {
  id?:number,
  employee_name:string,
  employee_salary:string,
  employee_age:string,
}
