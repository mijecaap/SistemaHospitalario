import { Component, OnInit, ViewChild } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogInfoComponent } from './dialog/dialog-info/dialog-info.component';
import { DialogFamiliaComponent } from './dialog/dialog-familia/dialog-familia.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  listPaciente: any[] = [];
  dataSourcePaciente: MatTableDataSource<any>;
  displayedColumnsPaciente: string[] = ['id', 'nombre', 'apellido', 'dni', 'familiares', 'accion'];
  @ViewChild("pagAsegurado") pagAsegurado!: MatPaginator;

  constructor(
    private afs: Firestore,
    private _matDialog: MatDialog,
  ) {

    this.leerAsegurados();
    this.dataSourcePaciente = new MatTableDataSource(this.listPaciente);
  }

  ngOnInit(): void {
  }

  info(i: number) {
    const dialogo = this._matDialog.open(DialogInfoComponent, { width: '40vw', maxHeight: '98vh', data: { asegurado: this.listPaciente[i] }, panelClass: 'info-container-dialog' });
    dialogo.beforeClosed().subscribe(() => {
    });
  }

  familia(i: number) {
    const dialogo = this._matDialog.open(DialogFamiliaComponent, { width: '40vw', maxHeight: '98vh', data: { asegurado: this.listPaciente[i] }, panelClass: 'info-container-dialog' });
    dialogo.beforeClosed().subscribe(() => {
    });
  }

  async leerAsegurados() {
    const querySnapshot = await getDocs(collection(this.afs, 'asegurado-principal'));
    querySnapshot.forEach((doc) => {
      this.listPaciente.push(doc.data());

    });
    this.dataSourcePaciente = new MatTableDataSource(this.listPaciente);
    this.dataSourcePaciente.paginator = this.pagAsegurado;
  }

  cntrl_applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePaciente.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcePaciente.paginator) {
      this.dataSourcePaciente.paginator.firstPage();
    }
  }
}
