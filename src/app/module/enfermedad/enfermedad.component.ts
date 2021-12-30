import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';

const enfermedades = [
  { id: 1, nombre: 'Cancer' }
]

@Component({
  selector: 'app-enfermedad',
  templateUrl: './enfermedad.component.html',
  styleUrls: ['./enfermedad.component.css']
})
export class EnfermedadComponent implements OnInit {

  listEnfermdad: any[] = [];
  dataSourceEnfermedad: MatTableDataSource<any>;
  displayedColumnsEnfermedad: string[] = ['id', 'nombre', 'gravedad'];

  constructor(
    private afs: Firestore
  ) {
    this.dataSourceEnfermedad = new MatTableDataSource(this.listEnfermdad)
    this.leerAsegurados()
  }

  ngOnInit(): void {
  }

  editar() {

  }

  async leerAsegurados() {
    const querySnapshot = await getDocs(collection(this.afs, 'enfermedad'));
    querySnapshot.forEach((doc) => {
      this.listEnfermdad.push(doc.data());

    });
    this.dataSourceEnfermedad = new MatTableDataSource(this.listEnfermdad);
  }

}
