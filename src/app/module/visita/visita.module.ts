import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitaRoutingModule } from './visita-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { VisitaComponent } from './visita.component';
import { AgregarComponent } from './agregar/agregar.component';


@NgModule({
  declarations: [
    VisitaComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    VisitaRoutingModule,
    AngularMaterialModule
  ]
})
export class VisitaModule { }
