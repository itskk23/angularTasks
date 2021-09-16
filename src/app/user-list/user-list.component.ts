import { Component, OnInit } from '@angular/core';
import {Customer} from './customer';
import {FormGroup, FormControl, Validator, Validators, FormBuilder, ValidationErrors, AbstractControl} from "@angular/forms";
import {debounceTime} from 'rxjs/operators';

function passwordMatch(c: AbstractControl): {[key: string]: boolean} | null {
  const pass = c.get("password");
  const confirmPass = c.get("rePassword");
  if(pass.pristine || confirmPass.pristine) {
    return null
  }
  if (pass.value === confirmPass.value) {
    return null
  } else {
    return {'match': true}
  }
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  customerForm: FormGroup;
  passwordMessage;
  emailMessage;
  isEditable = false;

  private validationMesssagesEmail = {
    required: ' Please enter your email',
    email: ' please enter valid email'
  }
  private validationMessagesPassword = {
    required: ' Please enter your password',
    minlength: ' Please enter a valid password',
    pattern: ' enter english characters only'
  }

  constructor(private fb: FormBuilder, public customers: Customer) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      nickname: ['',[Validators.required, Validators.pattern("[A-Za-z0-9-]+$")]],
      phoneNumber: ['',[Validators.required, Validators.pattern('^\\+?380(\\d{9})$')]],
      website: ['',[Validators.required, Validators.pattern('^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$')]],
      checkbox: [null, Validators.required],
      passwordGroup : this.fb.group({
        password: ['',[Validators.required, Validators.minLength(7),
          Validators.pattern('[A-Za-z0-9]+$')]],
        rePassword: ['', Validators.required]
      }, {validator: passwordMatch}),
      id: this.customers.customers.length+1
    })

    //observe changes
    const emailControl = this.customerForm.get('email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessageForEmail(emailControl));

    const passwordControl = this.customerForm.get('passwordGroup.password');
    passwordControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessageForPassword(passwordControl));

  };

  cancel(){
    this.isEditable = false;
    this.customerForm.reset();
  }

  save() {
    if(!this.isEditable){
    this.customers.customers.push(this.customerForm.value);
    this.customerForm.reset();
  } else {
      this.customers.updatePerson(this.customerForm.value);
      this.isEditable = !this.isEditable;
      this.customerForm.reset();
    }
  };

  //validation messages
  setMessageForEmail(c: AbstractControl): void {
    this.emailMessage = '';
    if((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMesssagesEmail[key])}
  }

  setMessageForPassword(c: AbstractControl): void {
    this.passwordMessage = '';
    if((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(
        key => this.validationMessagesPassword[key] + '.')}
  }

  setEdit(param){
    this.isEditable = !this.isEditable;
    let filteredPerson = this.customers.getPersonById(param);
    this.customerForm.patchValue(filteredPerson);
    this.customerForm.get('checkbox').disable()
    //თურმე patchvalue არსებობს მე კიდე ფორმბილდს ახლიდან ვწერდი ხელით ხელით:))))
  }

  setRemove(param){
    let permission = confirm('do you want to delete it?');
    if (permission) {
      this.customers.removePerson(param)
    }
  }
}
