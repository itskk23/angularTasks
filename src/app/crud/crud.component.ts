import { Component, OnInit } from '@angular/core';
import {EmployeesService, User} from "./employees.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  employeesArray$ = [];
  form: FormGroup;
  constructor( private myService: EmployeesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      employee_name: ['', Validators.required],
      employee_age: ['', Validators.required],
      employee_salary: ['', Validators.required]
      // employee_id: []
    })
this.getAllUsers();


  }
  getAllUsers(){
    this.myService.getAllEmployees().subscribe(value => this.employeesArray$ = value);
  }

  onEdit(value){
    this.myService.getEmployeeById(value).subscribe(value=> {
      this.form.get('employee_name').patchValue(value['employee_name'], Validators.required);
      this.form.get('employee_age').patchValue(value['employee_age'], Validators.required);
      this.form.get('employee_salary').patchValue(value['employee_salary'], Validators.required);
      // this.form.get('employee_id').patchValue(value['id'])
    })
  }

  addUser(){

    this.myService.addEmployee(this.form.getRawValue()).subscribe(value => console.log(value));
    this.getAllUsers();
    this.form.reset()

  }
}

