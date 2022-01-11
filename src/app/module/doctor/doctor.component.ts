import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatInput } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';

export interface Doctor {
  nombre: string;
  apellido: string;
  dni: string;
  celular: string;
  especialidad: string;
  foto: string;
}

export interface DoctorFilter {
  nombre: string;
  apellido: string;
  dni: string;
  celular: string;
  especialidad: string;
  foto: string;
  visible: boolean;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {

  listDoctores: DoctorFilter[] = [];
  dataSourceDoctor: MatTableDataSource<DoctorFilter>;
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
      let doctorFilter: DoctorFilter = {
        nombre: doc.data().nombre,
        apellido: doc.data().apellido,
        dni: doc.data().dni,
        celular: doc.data().celular,
        especialidad: doc.data().especialidad,
        foto: doc.data().foto,
        visible: true
      }
      this.listDoctores.push(doctorFilter);
    });
    this.dataSourceDoctor = new MatTableDataSource(this.listDoctores);
  }

  cntrl_filter(event: any): void {
    let value = event.target.value.toLocaleLowerCase();

    this.listDoctores = this.listDoctores.map(x => {
      let tf: boolean = x.nombre.toLocaleLowerCase().includes(value) ||
        x.apellido.toLocaleLowerCase().includes(value) ||
        x.dni.toLocaleLowerCase().includes(value) ||
        x.especialidad.toLocaleLowerCase().includes(value);
      if (tf) {
        x.visible = true;
      } else {
        x.visible = false;
      }
      return x;
    })
  }

}
