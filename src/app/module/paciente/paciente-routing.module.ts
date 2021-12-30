import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';

const routes: Routes = [
  {
    path: '', component: PacienteComponent
  },
  {
    path: 'agregar', component: AgregarPacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
