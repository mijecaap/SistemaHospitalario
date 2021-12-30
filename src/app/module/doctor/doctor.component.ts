import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {

  listDoctores: any[] = [];
  dataSourceDoctor: MatTableDataSource<any>;
  displayedColumnsDoctor: string[] = ['id', 'nombre', 'apellido', 'dni', 'enfermedad'];

  constructor(
    private afs: Firestore,
  ) {
    this.leerDoctores()
    this.dataSourceDoctor = new MatTableDataSource(this.listDoctores);
  }

  async leerDoctores() {
    const querySnapshot = await getDocs(collection(this.afs, 'doctor'));
    querySnapshot.forEach((doc) => {
      this.listDoctores.push(doc.data());

    });
    this.dataSourceDoctor = new MatTableDataSource(this.listDoctores);
  }

}
