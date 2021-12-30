import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Asegurado } from '../../agregar-paciente/agregar-paciente.component';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.css']
})
export class DialogInfoComponent implements OnInit {

  constructor(
    private _thisDialog: MatDialogRef<DialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asegurado: Asegurado },
  ) { }

  ngOnInit(): void {
  }

}
