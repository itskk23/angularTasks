import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/data/?limit=10')
  }

  getEmployeeById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/data/${id}`)
  }
  addEmployee(user: User[]): Observable<User[]> {
    return this.http.post<User[]>(`http://localhost:3000/data`, user)
  }
  updateEmployee(id:number, user: User[]): Observable<User[]> {
    return this.http.put<User[]>(`http://localhost:3000/data/${id}`, user)
  }
  deleteEmployee(id: number){
    return this.http.delete( `http://localhost:3000/data/${id}`)
  }
}


export interface  User {
  id?:number,
  employee_name:string,
  employee_salary:string,
  employee_age:string,
}
