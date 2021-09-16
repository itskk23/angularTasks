import {FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControl} from "@angular/forms";
import {Person} from "@angular/cli/utilities/package-json";
import {OnInit} from '@angular/core'
export class Customer {

  customers = [
    {
      id: 1,
      email: 'kaxakaxurashvili@gmail.com',
      passwordGroup:{
        password: 'mdzimefexi',
        rePassword: 'mdzimefexi'
      },
      phoneNumber: '+380123456789',
      checkbox: true,
      website: 'araferi.ge',
      nickname: 'kaxuchela'
    },
    {
      id: 2,
      email: 'kaxuchela@gmail.com',
      passwordGroup:{
        password: 'arasworaivitom',
        rePassword: 'arasworiavitom'
      },
      checkbox: true,
      phoneNumber: '+380123456781',
      website: 'bolo.ge',
      nickname: 'kaxaia'
    }
    ];

  filteredCustomers = this.customers.map(data => data);
    getPersonById(param){
      let pasuxi = this.customers.filter(p => p.id == param)[0];
      return pasuxi;
    };

    updatePerson(param) {
      this.customers = this.customers.map(person => {
      return person.id == param.id? param: person;
  })
    };
    removePerson(param) {
      let pasuxi = this.customers.find(p => p.id == param);
      let index = this.customers.indexOf(pasuxi)
      this.customers.splice(index, 1);

    }

}
