import { Component, OnInit, ViewChild } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Especialidad {
  id: string;
  nombre: string;
  enfermedad: string[];
}

export interface Enfermedad {
  nombre: string;
}

@Component({
  selector: 'app-enfermedad',
  templateUrl: './enfermedad.component.html',
  styleUrls: ['./enfermedad.component.css']
})
export class EnfermedadComponent implements OnInit {

  title: string = ""

  listEspecialidad: Especialidad[] = [];
  dataSourceEspecialidad: MatTableDataSource<any>;
  displayedColumnsEspecialidad: string[] = ['id', 'nombre'];
  @ViewChild("pagEspecialidad") pagEpecialidad!: MatPaginator;

  listEnfermedad: Enfermedad[] = [];
  dataSourceEnfermedad: MatTableDataSource<any>;
  displayedColumnsEnfermedad: string[] = ['id', 'nombre']
  @ViewChild("pagEnfermedad") pagEnfermedad!: MatPaginator;

  constructor(
    private afs: Firestore
  ) {
    this.dataSourceEspecialidad = new MatTableDataSource(this.listEspecialidad)
    this.dataSourceEnfermedad = new MatTableDataSource(this.listEnfermedad)
    this.leerEspecialidad()
  }

  ngOnInit(): void {
  }

  async leerEspecialidad() {
    const querySnapshot = await getDocs(collection(this.afs, 'especialidad'));
    querySnapshot.forEach((doc) => {
      let temp: Especialidad = {
        id: doc.id,
        nombre: doc.data().nombre,
        enfermedad: doc.data().enfermedad
      }
      this.listEspecialidad.push(temp);
    });
    this.title = this.listEspecialidad[0].nombre;
    this.listEnfermedad = []
    this.listEspecialidad[0].enfermedad.forEach((e) => {
      let enf: Enfermedad = {
        nombre: e
      }
      this.listEnfermedad.push(enf);
    })
    this.dataSourceEspecialidad = new MatTableDataSource(this.listEspecialidad);
    this.dataSourceEspecialidad.paginator = this.pagEpecialidad;
    this.dataSourceEnfermedad = new MatTableDataSource(this.listEnfermedad);
    this.dataSourceEnfermedad.paginator = this.pagEnfermedad;
  }

  seleccionarEspecialidad(i: number) {
    this.title = this.listEspecialidad[i].nombre;
    this.listEnfermedad = []
    this.listEspecialidad[i].enfermedad.forEach((e) => {
      let enf: Enfermedad = {
        nombre: e
      }
      this.listEnfermedad.push(enf);
    })
    this.dataSourceEnfermedad = new MatTableDataSource(this.listEnfermedad);
    this.dataSourceEnfermedad.paginator = this.pagEnfermedad;
  }

  cntrl_applyFilterEspecialidad(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEspecialidad.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceEspecialidad.paginator) {
      this.dataSourceEspecialidad.paginator.firstPage();
    }
  }

  cntrl_applyFilterEnfermedad(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEnfermedad.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceEnfermedad.paginator) {
      this.dataSourceEnfermedad.paginator.firstPage();
    }
  }
}
