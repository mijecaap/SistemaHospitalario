import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {

  listVisita: any[] = [];

  dataSourceVisita: MatTableDataSource<any>;
  displayedColumnsVisita: string[] = ['id', 'dni', 'enfermedad', 'fecha'];

  constructor(
    private afs: Firestore
  ) {
    this.dataSourceVisita = new MatTableDataSource(this.listVisita)
  }

  ngOnInit(): void {
  }

  async leerAsegurados() {
    const querySnapshot = await getDocs(collection(this.afs, 'visita'));
    querySnapshot.forEach((doc) => {
      this.listVisita.push(doc.data());
    });
    this.dataSourceVisita = new MatTableDataSource(this.listVisita);
  }

}
