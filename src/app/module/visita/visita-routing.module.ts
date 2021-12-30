import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitaComponent } from './visita.component';
import { AgregarComponent } from './agregar/agregar.component';

const routes: Routes = [
  {
    path: '', component: VisitaComponent
  },
  {
    path: 'agregar', component: AgregarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitaRoutingModule { }
