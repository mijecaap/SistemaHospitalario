import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamaRoutingModule } from './cama-routing.module';
import { CamaComponent } from './cama.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DarAltaComponent } from './dar-alta/dar-alta.component';


@NgModule({
  declarations: [
    CamaComponent,
    DarAltaComponent
  ],
  imports: [
    CommonModule,
    CamaRoutingModule,
    AngularMaterialModule,
  ]
})
export class CamaModule { }
