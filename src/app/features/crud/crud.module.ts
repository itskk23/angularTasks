import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CrudComponent} from "./crud.component";
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CrudComponent
      }
    ])
  ]
})
export class CrudModule { }
