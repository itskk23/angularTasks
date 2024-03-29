import {Component, OnInit} from '@angular/core';
import {EmployeesService, User} from "./employees.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  employeesArray$ = [];
  paginationArr= [];
  currentUser;
  form: FormGroup;
  isEditable: Boolean = false;
  count: number = 0;

  constructor(private myService: EmployeesService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      employee_name: ['', Validators.required],
      employee_age: ['', Validators.required],
      employee_salary: ['', Validators.required],
      employee_id: [],
      email: ['aq@gmail.com'],
      password: ['aqaqaqaaqq']
    })
    this.getAllUsers();
  }

  nextPage(){
    if(this.count + 1 > this.employeesArray$.length / 5){
      alert('this is the last page')
    } else {
      this.getAllUsers();
      this.count++
    }
  }

  prevPage(){
    this.getAllUsers();
    if(this.count === 0) {
      alert('this is the first page, mon ami!')
    } else {
      this.count--;
    }
  }

  getAllUsers() {
    this.myService.getAllEmployees().pipe(
      tap(value => this.employeesArray$ = value),
      tap(value => this.paginationArr = value.slice(this.count * 5, this.count * 5  + 5))).subscribe()
  }

  cancelUser(){
    console.log(this.form.value)
    this.form.reset()
  }

  onEdit(value) {
    this.isEditable = true;
    const token = localStorage.getItem('token');
    const letFind = this.paginationArr.find(user => user.token === token);
    if(letFind.id === value){
      this.myService.getEmployeeById(value).subscribe(value => {
        this.form.get('employee_name').patchValue(value['employee_name'], Validators.required);
        this.form.get('employee_age').patchValue(value['employee_age'], Validators.required);
        this.form.get('employee_salary').patchValue(value['employee_salary'], Validators.required);
        this.form.get('employee_id').patchValue(value['id'])
      })
    }

  }

  addUser() {
    if (this.isEditable) {
      const token = localStorage.getItem('token');
      const letFind = this.paginationArr.find(user => user.token === token);
      if(letFind.id === this.form.get('employee_id').value){
        letFind.employee_age =  this.form.get('employee_age').value;
        letFind.employee_name =  this.form.get('employee_name').value;
        letFind.employee_salary = this.form.get('employee_salary').value;
        this.isEditable = false;
        this.myService.updateEmployee(this.form.get('employee_id').value, letFind).subscribe(value => this.getAllUsers());
        this.form.reset();
        }

    } else {
      this.myService.addEmployee(this.form.getRawValue()).subscribe(value => this.getAllUsers());
      this.form.reset()
    }
  }

  onRemove(value){
    const token = localStorage.getItem('token');
    const letFind = this.paginationArr.find(user => user.token === token);
    if(letFind.id === value){
      this.myService.deleteEmployee(value).subscribe(value1 => this.getAllUsers());
      localStorage.clear()
    }


  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('').then();

  }
}
