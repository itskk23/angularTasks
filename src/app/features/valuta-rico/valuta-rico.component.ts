import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-valuta-rico',
  templateUrl: './valuta-rico.component.html',
  styleUrls: ['./valuta-rico.component.css']
})
export class ValutaRicoComponent implements OnInit {
  form
  currencyNames: string[] = []
  sum: number = 0

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      currencies: this.fb.array([this.fb.group({
        selectIn: ['USD'],
        valueIn: [0],
      })]),
      selectOut: ['GEL'],
      valueOut: [0],
    })
  }

  ngOnInit(): void {
    this.http.get(`https://api.fastforex.io/currencies?api_key=ebdf6ea3dd-c5af28a67d-r08m7s`).pipe(
      tap((value: any) => {
          this.currencyNames = Object.keys(value.currencies)
        }
      )
    ).subscribe()
    this.form.get('currencies')?.valueChanges.pipe(
      tap( (value:any) => {
          for (let i = 0; i < value.length; i++){
            this.convertCurrency(value[i]?.selectIn, value[i].valueIn)
          }
        }
      )
    ).subscribe();
    this.selectOut?.valueChanges?.pipe(
      tap( (value) => {
          let currencyArr = this.form.get('currencies')?.value
          for (let i = 0; i < currencyArr.length; i++){
            this.convertCurrency(currencyArr[i]?.selectIn, currencyArr[i].valueIn)
          }
        }
      )
    ).subscribe();

  }

  newCurrency(): FormGroup {
    return this.fb.group({
      selectIn: ['USD'],
      valueIn: [0],
    })
  }

  convertCurrency(currency: string, amount: number) {
    this.sum = 0;
    this.http.get(`https://api.fastforex.io/fetch-one?from=${currency}&to=${this.selectOut}&api_key=ebdf6ea3dd-c5af28a67d-r08m7s`).pipe(
      tap( (value: any) => {
          this.sum += amount * value.result[`${this.selectOut}`]
          this.form.get('valueOut')?.setValue(this.sum, {emitEvent: false, onlySelf: true})
        }
      )
    ).subscribe()
  }

  addCurrency() {
    this.allCurrencies.push(this.newCurrency());
  }

  get allCurrencies() : FormArray {
    return this.form.get("currencies") as FormArray
  }

  get selectOut(){
    return this.form.get('selectOut')?.value
  }
}


