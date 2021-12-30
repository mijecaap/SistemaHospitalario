import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './agregar/agregar.component';
import { DoctorComponent } from './doctor.component';

const routes: Routes = [
  {
    path: '', component: DoctorComponent,
  },
  {
    path: 'agregar', component: AgregarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
