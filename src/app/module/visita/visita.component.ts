import { Component, OnInit, ViewChild } from '@angular/core';
import { collection, Firestore, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from '../doctor/doctor.component';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements OnInit {

  listVisita: any[] = [];

  dataSourceVisita: MatTableDataSource<any>;
  displayedColumnsVisita: string[] = ['id', 'dni', 'area', 'doctor', 'fecha', 'hora'];
  @ViewChild("pagVisita") pagVisita!: MatPaginator;

  constructor(
    private afs: Firestore
  ) {
    this.leerAsegurados();
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
    this.dataSourceVisita.paginator = this.pagVisita;
  }

  cntrl_applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVisita.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceVisita.paginator) {
      this.dataSourceVisita.paginator.firstPage();
    }
  }

}
