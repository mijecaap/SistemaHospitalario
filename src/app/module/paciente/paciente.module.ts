import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';
import { DialogFamiliaComponent } from './dialog/dialog-familia/dialog-familia.component';
import { DialogInfoComponent } from './dialog/dialog-info/dialog-info.component';


@NgModule({
  declarations: [
    PacienteComponent,
    AgregarPacienteComponent,
    DialogFamiliaComponent,
    DialogInfoComponent,
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    AngularMaterialModule
  ]
})
export class PacienteModule { }
