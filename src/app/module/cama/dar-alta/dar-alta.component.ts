import { Component, Inject, OnInit } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Asegurado } from '../../paciente/agregar-paciente/agregar-paciente.component';
import { Cama } from '../cama.component';

@Component({
  selector: 'app-dar-alta',
  templateUrl: './dar-alta.component.html',
  styleUrls: ['./dar-alta.component.css']
})
export class DarAltaComponent implements OnInit {

  idAsegurado: string = '';
  tablaAsegurado: string = '';
  asegurado?: Asegurado;
  internado?: any;

  constructor(
    private thisDialog: MatDialogRef<DarAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idInternado: string, idCama: string },
    private afs: Firestore
  ) {
    this.leerInternado();
  }

  ngOnInit(): void {
  }

  async leerInternado() {
    const docRef = doc(this.afs, 'internado', this.data.idInternado)
    const docSnap = await getDoc(docRef);
    this.internado = docSnap.data();

    const q = query(collection(this.afs, 'asegurado-principal'), where('dni', '==', (docSnap.data() as any).dni))
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const q2 = query(collection(this.afs, 'asegurado-familia'), where('dni', '==', (docSnap.data() as any).dni))
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((docSnap) => {
        this.idAsegurado = docSnap.id;
        this.tablaAsegurado = 'familia';
        this.test(docSnap.data());
      })
    } else {
      querySnapshot.forEach((docSnap) => {
        this.idAsegurado = docSnap.id;
        this.tablaAsegurado = 'principal';
        this.test(docSnap.data());
      })
    }
  }

  test(asegurado: any) {
    this.asegurado = asegurado;
  }

  async darAlta() {
    const camaRef = doc(this.afs, 'camas', this.data.idCama);
    await updateDoc(camaRef, {
      idInternado: ""
    })
    const aseguradoRef = doc(this.afs, `asegurado-${this.tablaAsegurado}`, this.idAsegurado);
    await updateDoc(aseguradoRef, {
      estado: 0
    })
    this.thisDialog.close();
  }

}
