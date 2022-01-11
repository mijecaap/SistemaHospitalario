import { Component, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { updateDoc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Cama } from '../cama/cama.component';
import { Asegurado, Familia } from '../paciente/agregar-paciente/agregar-paciente.component';

export interface Enfermedad {
  nombre: string;
  gravedad: number;
}

@Component({
  selector: 'app-internar',
  templateUrl: './internar.component.html',
  styleUrls: ['./internar.component.css']
})
export class InternarComponent {

  internarForm: FormGroup;
  listAsegurado: Asegurado[] = [];
  listCama: Cama[] = [];
  listCamaSelected: Cama[] = [];
  listEnfermedad: Enfermedad[] = [];
  tablaAsegurado: string = '';
  idAsegurado: string = '';
  siguientePaso: boolean = false;
  // listFamilia: string[] = [];

  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.internarForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      piso: ['', Validators.required],
      numero: [0, Validators.required],
      motivo: [0, Validators.required],
    })
    this.leerDNI();
    this.filteredOptions = this.internarForm.controls['dni'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.leerCamas();
    this.leerEnfermedades();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  async leerDNI() {
    const querySnapshot = await getDocs(collection(this.afs, 'asegurado-principal'));
    querySnapshot.forEach((doc) => {
      this.options.push(doc.data().dni)
    });
    const querySnapshot2 = await getDocs(collection(this.afs, 'asegurado-familia'));
    querySnapshot2.forEach((doc) => {
      this.options.push(doc.data().dni)
    });
    this.filteredOptions = this.internarForm.controls['dni'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  async leerCamas() {
    const q = query(collection(this.afs, 'camas'), orderBy('numero', 'asc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.listCama.push(doc.data() as Cama);
    })
  }

  onPisoChange(e: any) {
    this.listCamaSelected = [];
    this.listCama.forEach((c: Cama) => {
      if (c.piso == parseInt(e.target.value) && c.idInternado == "") {
        this.listCamaSelected.push(c);
      }
    })
    console.log(this.listCamaSelected);
  }

  async leerEnfermedades() {
    const querySnapshot = await getDocs(collection(this.afs, 'enfermedad'));
    querySnapshot.forEach((doc) => {
      if ((doc.data() as Enfermedad).gravedad == 2) {
        this.listEnfermedad.push(doc.data() as Enfermedad);
      }
    })
  }


  async agregar() {
    const q = query(collection(this.afs, 'asegurado-principal'), where('dni', '==', this.internarForm.value.dni));
    const querySnap = await getDocs(q);
    if (querySnap.empty) {
      const q2 = query(collection(this.afs, 'asegurado-familia'), where('dni', '==', this.internarForm.value.dni));
      const querySnap2 = await getDocs(q2);
      if (querySnap2.empty) {
        this.toastr.error('No se encontró ninguno asegurado con ese dni', 'DNI INCORRECTO', {
          positionClass: 'toast-bottom-right'
        })
      } else {
        querySnap2.forEach((doc) => {
          this.idAsegurado = doc.id;
          this.tablaAsegurado = 'familia'
        })
        this.siguientePaso = true;
      }
    } else {
      querySnap.forEach((doc) => {
        this.idAsegurado = doc.id;
        this.tablaAsegurado = 'principal'
      })
      this.siguientePaso = true;
    }
    if (this.siguientePaso) {
      let internado = {
        dni: this.internarForm.value.dni,
        piso: this.internarForm.value.piso,
        cama: parseInt(this.internarForm.value.numero),
        motivo: this.internarForm.value.motivo
      }
      const docInt = await addDoc(collection(this.afs, 'internado'), internado);
      const querySnapshot = await getDocs(collection(this.afs, 'camas'));
      const updateAsegurado = doc(this.afs, `asegurado-${this.tablaAsegurado}`, this.idAsegurado);
      updateDoc(updateAsegurado, {
        estado: 3
      })
      querySnapshot.forEach((document) => {
        if ((document.data() as Cama).numero == parseInt(this.internarForm.value.numero)) {
          const update = doc(this.afs, "camas", document.id)
          updateDoc(update, {
            idInternado: docInt.id
          })
          this.route.navigate(['/cama']);
        }
      })
    }
  }
}
