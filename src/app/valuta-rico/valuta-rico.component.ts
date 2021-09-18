import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
// import * as http from "http";

@Component({
  selector: 'app-valuta-rico',
  templateUrl: './valuta-rico.component.html',
  styleUrls: ['./valuta-rico.component.css']
})
export class ValutaRicoComponent implements OnInit {

  constructor(private  http: HttpClient, private fb: FormBuilder) { }
  form: FormGroup;
  testArr: any[] = [];
  currencyArr: string[] = [
    "USD", "EUR","GEL", "GBP", "CAD", "HKD", "ISK", "PHP", "DKK", "HUF",
    "CZK",  "RON", "SEK", "IDR", "INR",
    "BRL", "RUB", "HRK", "JPY", "THB", "CHF",
     "MYR", "BGN", "TRY", "CNY", "NOK",
    "NZD", "ZAR",  "MXN", "SGD", "AUD",
    "ILS", "KRW", "PLN",
  ];
  fromCountry: string = '';
  toCountry: string = '';
  ngOnInit(): void {
    this.form = this.fb.group({
      selectIn: ["USD"],
      selectOut: ["GEL"],
      valueIn: [""],
      valueOut: [""]
    })

  }

  moneyIn(){
    this.getHttp(this.selectIn)
  }
  moneyOut(){
    this.getHttp(this.selectOut)
  }
  getHttp(fromExchange){
    if(fromExchange === this.selectIn) {
      var toExchange = this.selectOut;
      this.http.get(`https://api.fastforex.io/fetch-all?from=${fromExchange}&api_key=a19718ddc9-0b6657933e-qzl561`).pipe(
        map(value => value['results']),
        tap(value => this.transform(value[toExchange]))
      ).subscribe();
    } else{
      var toExchange2 = this.selectIn;
      this.http.get(`https://api.fastforex.io/fetch-all?from=${fromExchange}&api_key=a19718ddc9-0b6657933e-qzl561`).pipe(
        map(value =>value['results']),
        tap(value => this.transformBackwards(value[toExchange2]))
      ).subscribe();
    }

  };

  transform(exchangeRate) {
    this.form.get('valueOut').patchValue(this.valueIn * exchangeRate);
  }

  transformBackwards(exchangeRate) {
    this.form.get('valueIn').patchValue(this.valueOut * exchangeRate);
  }

  get valueOut(){
    return this.form.get("valueOut").value
  }
  get valueIn(){
    return this.form.get("valueIn").value
  }
  get selectIn(){
    return this.form.get("selectIn").value
  }
  get selectOut(){
    return this.form.get("selectOut").value
  }

}
