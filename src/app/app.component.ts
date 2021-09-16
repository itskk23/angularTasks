import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ValidationErrors} from "@angular/forms";
import {UserListComponent} from "./user-list/user-list.component";
import {tap} from "rxjs/operators";
import {ConfirmedValidator} from './confirmed.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  signUpForm: FormGroup = new FormGroup({});
  phonePattern = '^(?:\+38)?(?:\(044\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$';
  submitDisabled: boolean = true;

  constructor(private fb: FormBuilder) {
//

  }

  ngOnInit() :void {

    // this.signUpForm = this.fb.group({
    //     email: new FormControl('',[Validators.required, Validators.email]),
    //     nickname: new FormControl('',[Validators.required, Validators.pattern("(^[A-Za-z0-9-]+$)")]),
    //     phoneNumber: new FormControl('',[Validators.required]),
    //     website: new FormControl('',[Validators.required]),
    //     checkbox: new FormControl(null, Validators.required),
    //     passwordGroup: new FormGroup({
    //       password: new FormControl('',[Validators.required, Validators.minLength(7),
    //         Validators.pattern('(^[a-zA-Z0-9 ]+$)')]),
    //       rePassword: new FormControl('', Validators.required)
    //     }, {validators: this.passwordMatch}),
    //   }
    // )

  }


  // passwordMatch(signUpForm: FormGroup) :ValidationErrors | null{
  //
  //   const pass = signUpForm.get("password")?.value;
  //   const confirmPass = signUpForm.get("rePassword").value;
  //   if(pass!==confirmPass){
  //     console.log('if')
  //     return {"confirmed":true}
  //   }else{
  //     console.log('else')
  //     return null;
  //   }
  //
  // }
  // onSubmit(){
  //   // this.checker();
  //
  //
  //
  // }

  // kk(){
  //   console.log(this.signUpForm.get('checkbox').value)
  //   console.log('rame')
  // }

}
