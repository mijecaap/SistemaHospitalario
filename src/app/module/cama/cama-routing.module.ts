import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamaComponent } from './cama.component';
import { DarAltaComponent } from './dar-alta/dar-alta.component';

const routes: Routes = [
  {
    path: '', component: CamaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamaRoutingModule { }
