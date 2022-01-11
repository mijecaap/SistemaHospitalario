import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs, orderBy, query } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DarAltaComponent } from './dar-alta/dar-alta.component';

export interface Cama {
  id: string;
  numero: number;
  piso: number;
  idInternado: string;
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
    private afs: Firestore,
    private matDialog: MatDialog
  ) {
    this.leerAsegurados();
  }

  ngOnInit(): void {
  }

  async leerAsegurados() {
    this.listCama = []
    this.listPiso1 = []
    this.listPiso2 = []
    const q = query(collection(this.afs, 'camas'), orderBy('numero', 'asc'))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let cama: Cama = {
        id: doc.id,
        piso: doc.data().piso,
        numero: doc.data().numero,
        idInternado: doc.data().idInternado
      }
      this.listCama.push(cama);
    });
    this.listCama.forEach((c) => {
      if (c.piso == 1) {
        this.listPiso1.push(c)
      } else {
        this.listPiso2.push(c)
      }
    })
  }

  backgroundColor(state: string): string {
    if (state != "") {
      return '#F44336'
    } else {
      return '#BBDEFB'
    }
  }

  textColor(state: string): string {
    if (state != "") {
      return 'white'
    } else {
      return 'black'
    }
  }

  setCursor(state: string): string {
    if (state != "") {
      return 'pointer'
    } else {
      return 'inherit'
    }
  }

  darAlta(idInternado: string, idCama: string) {
    if (idInternado != '') {
      const dialogo = this.matDialog.open(DarAltaComponent, { width: '30vw', maxHeight: '98vh', data: { idInternado: idInternado, idCama: idCama }, panelClass: 'info-container-dialog' })
      dialogo.beforeClosed().subscribe(() => {
        this.leerAsegurados();
      });
    }
  }

}
