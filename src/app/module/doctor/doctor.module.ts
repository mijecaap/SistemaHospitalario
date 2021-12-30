import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AgregarComponent } from './agregar/agregar.component';


@NgModule({
  declarations: [
    DoctorComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    AngularMaterialModule
  ]
})
export class DoctorModule { }
