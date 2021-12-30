import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternarRoutingModule } from './internar-routing.module';
import { InternarComponent } from './internar.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [
    InternarComponent
  ],
  imports: [
    CommonModule,
    InternarRoutingModule,
    AngularMaterialModule
  ]
})
export class InternarModule { }
