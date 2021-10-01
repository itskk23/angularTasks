import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  logIn(){
    this.auth.auth(this.username.value, this.password.value)
  }

}
