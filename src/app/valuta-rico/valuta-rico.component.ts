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
    "CAD", "HKD", "ISK", "PHP", "DKK", "HUF",
    "CZK", "GBP", "RON", "SEK", "IDR", "INR",
    "BRL", "RUB", "HRK", "JPY", "THB", "CHF",
    "EUR", "MYR", "BGN", "TRY", "CNY", "NOK",
    "NZD", "ZAR", "USD", "MXN", "SGD", "AUD",
    "ILS", "KRW", "PLN", "GEL"
  ]
  ngOnInit(): void {
    this.form = this.fb.group({
      selectIn: ["CAD"],
      selectOut: ["EUR"],
      valueIn: [""],
      valueOut: [""]
    })

  console.log(this.form.get('valueOut').value)


  }


  moneyIn(){
    // this.form.get('valueOut').patchValue(this.valueIn * 2);
    // console.log(this.selectOut)
    this.getHttp(this.selectIn)
  }
  moneyOut(){
    // this.form.get('valueOut').patchValue(this.valueIn * 2);
    // console.log(this.selectOut)
    this.getHttp(this.selectOut)
  }
  getHttp(fromExchange){
    const cvladi = this.selectOut;
    console.log(cvladi);
    this.http.get(`https://api.fastforex.io/fetch-all?from=${fromExchange}&api_key=a19718ddc9-0b6657933e-qzl561`).pipe(
      map(value => value['results']),
      tap(value => this.transform(value[cvladi]))
    ).subscribe();
  };

  transform(exchangeRate) {
    this.form.get('valueOut').patchValue(this.valueIn * exchangeRate);
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
