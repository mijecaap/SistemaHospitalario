import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEnfermedadComponent } from './agregar-enfermedad/agregar-enfermedad.component';
import { EnfermedadComponent } from './enfermedad.component';

const routes: Routes = [
  {
    path: '', component: EnfermedadComponent
  },
  {
    path: 'agregar', component: AgregarEnfermedadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnfermedadRoutingModule { }
