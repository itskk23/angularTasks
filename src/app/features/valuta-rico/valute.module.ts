import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ValutaRicoComponent} from "./valuta-rico.component";
import {RouterModule} from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ValutaRicoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ValutaRicoComponent
      }
    ])
  ]
})
export class ValuteModule { }
