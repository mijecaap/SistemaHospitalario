import { Component, Inject, OnInit } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
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
  idAsegurador: string = '';
  dataSourceFamilia: MatTableDataSource<Familia>;
  displayedColumnsFamilia: string[] = ['nombre', 'apellido', 'dni', 'rol'];

  constructor(
    private _thisDialog: MatDialogRef<DialogFamiliaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asegurado: Asegurado },
    private afs: Firestore
  ) {
    this.leerFamilia();
    this.dataSourceFamilia = new MatTableDataSource(this.listFamilia);
  }

  ngOnInit(): void {
  }

  async leerFamilia() {
    const q = query(collection(this.afs, 'asegurado-principal'), where('dni', '==', this.data.asegurado.dni))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      this.idAsegurador = doc.id
    })
    const q2 = query(collection(this.afs, 'asegurado-familia'), where('asegurador', '==', this.idAsegurador))
    const querySnapshot2 = await getDocs(q2)
    querySnapshot2.forEach((doc) => {
      this.listFamilia.push(doc.data() as Familia)
    })
    this.dataSourceFamilia = new MatTableDataSource(this.listFamilia);
  }

}
