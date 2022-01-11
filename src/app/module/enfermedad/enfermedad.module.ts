import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfermedadRoutingModule } from './enfermedad-routing.module';
import { EnfermedadComponent } from './enfermedad.component';
import { AngularMaterialModule } from '../../angular-material.module';


@NgModule({
  declarations: [
    EnfermedadComponent,
  ],
  imports: [
    CommonModule,
    EnfermedadRoutingModule,
    AngularMaterialModule,
  ]
})
export class EnfermedadModule { }
