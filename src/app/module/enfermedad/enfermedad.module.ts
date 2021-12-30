import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfermedadRoutingModule } from './enfermedad-routing.module';
import { EnfermedadComponent } from './enfermedad.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { AgregarEnfermedadComponent } from './agregar-enfermedad/agregar-enfermedad.component';


@NgModule({
  declarations: [
    EnfermedadComponent,
    AgregarEnfermedadComponent
  ],
  imports: [
    CommonModule,
    EnfermedadRoutingModule,
    AngularMaterialModule,
  ]
})
export class EnfermedadModule { }
