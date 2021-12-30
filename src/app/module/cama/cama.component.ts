import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

export interface Cama {
  numero: number;
  piso: number;
  estado: boolean;
}

@Component({
  selector: 'app-cama',
  templateUrl: './cama.component.html',
  styleUrls: ['./cama.component.css']
})
export class CamaComponent implements OnInit {

  listCama: Cama[] = [];
  listPiso1: Cama[] = [];
  listPiso2: Cama[] = [];

  constructor(
    private afs: Firestore
  ) {
    this.leerAsegurados();
  }

  ngOnInit(): void {
  }

  async leerAsegurados() {
    const querySnapshot = await getDocs(collection(this.afs, 'camas'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      this.listCama.push(doc.data() as Cama);
    });
    this.listCama.forEach((c) => {
      if (c.piso == 1) {
        this.listPiso1.push(c)
      } else {
        this.listPiso2.push(c)
      }
    })
  }

  backgroundColor(state: boolean): string {
    if (state) {
      return '#F44336'
    } else {
      return '#BBDEFB'
    }
  }

  textColor(state: boolean): string {
    if (state) {
      return 'white'
    } else {
      return 'black'
    }
  }

}
