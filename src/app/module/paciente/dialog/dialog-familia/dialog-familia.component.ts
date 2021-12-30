import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Asegurado, Familia } from '../../agregar-paciente/agregar-paciente.component';

@Component({
  selector: 'app-dialog-familia',
  templateUrl: './dialog-familia.component.html',
  styleUrls: ['./dialog-familia.component.css']
})
export class DialogFamiliaComponent implements OnInit {

  listFamilia: Familia[] = [];
  dataSourceFamilia: MatTableDataSource<Familia>;
  displayedColumnsFamilia: string[] = ['nombre', 'apellido', 'dni', 'rol'];

  constructor(
    private _thisDialog: MatDialogRef<DialogFamiliaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asegurado: Asegurado },
  ) {
    this.dataSourceFamilia = new MatTableDataSource(this.data.asegurado.familia);
  }

  ngOnInit(): void {
  }

}
