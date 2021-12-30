import { Component, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDocs } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { updateDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Cama } from '../cama/cama.component';
import { Enfermedad } from '../enfermedad/agregar-enfermedad/agregar-enfermedad.component';
import { Asegurado, Familia } from '../paciente/agregar-paciente/agregar-paciente.component';

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
  // listFamilia: string[] = [];

  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private route: Router
  ) {
    this.internarForm = this.fb.group({
      dni: ['', Validators.required],
      piso: ['', Validators.required],
      numero: [0, Validators.required],
      enfermedad: [0, Validators.required],
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
    const querySnapshot = await getDocs(collection(this.afs, 'asegurado'));
    querySnapshot.forEach((doc) => {
      this.listAsegurado.push(doc.data() as Asegurado);
    });
    this.listAsegurado.forEach((as: Asegurado) => {
      let dni: string = as.dni
      this.options.push(dni);
      if (as.familia.length > 0) {
        as.familia.forEach((f) => {
          let dni: string = f.dni;
          this.options.push(dni);
        })
      }
    })
    this.filteredOptions = this.internarForm.controls['dni'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  async leerCamas() {
    const querySnapshot = await getDocs(collection(this.afs, 'camas'));
    querySnapshot.forEach((doc) => {
      this.listCama.push(doc.data() as Cama);
    })
  }

  onPisoChange(e: any) {
    this.listCamaSelected = [];
    this.listCama.forEach((c: Cama) => {
      if (c.piso == parseInt(e.target.value) && c.estado == false) {
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
    let internado = {
      dni: this.internarForm.value.dni,
      piso: this.internarForm.value.piso,
      cama: parseInt(this.internarForm.value.numero),
      enfermedad: this.internarForm.value.enfermedad
    }
    console.log(internado);
    addDoc(collection(this.afs, 'internado'), internado);
    const querySnapshot = await getDocs(collection(this.afs, 'camas'));
    querySnapshot.forEach((document) => {
      if ((document.data() as Cama).numero == parseInt(this.internarForm.value.numero)) {
        console.log(document.id);
        const update = doc(this.afs, "camas", document.id)
        updateDoc(update, {
          estado: true
        })

        this.route.navigate(['/cama']);
      }
    })

  }


}
