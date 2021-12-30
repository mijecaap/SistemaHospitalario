import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternarComponent } from './internar.component';

const routes: Routes = [
  {
    path: '', component: InternarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternarRoutingModule { }
