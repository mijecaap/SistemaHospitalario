import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Enfermedad } from '../../enfermedad/agregar-enfermedad/agregar-enfermedad.component';
import { Asegurado } from '../../paciente/agregar-paciente/agregar-paciente.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  listAsegurado: Asegurado[] = [];
  listEnfermedad: Enfermedad[] = [];

  visitaForm: FormGroup;

  options: string[] = [];
  filteredOptions: Observable<string[]>;


  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private route: Router
  ) {
    this.visitaForm = this.fb.group({
      dni: ['', Validators.required],
      enfermedad: ['', Validators.required],
      fecha: ['', Validators.required],
    })
    this.leerDNI();
    this.filteredOptions = this.visitaForm.controls['dni'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.leerEnfermedades();
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
    this.filteredOptions = this.visitaForm.controls['dni'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  async leerEnfermedades() {
    const querySnapshot = await getDocs(collection(this.afs, 'enfermedad'));
    querySnapshot.forEach((doc) => {
      if ((doc.data() as Enfermedad).gravedad == 1) {
        this.listEnfermedad.push(doc.data() as Enfermedad);
      }
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  async agregar() {
    let visita = {
      dni: this.visitaForm.value.dni,
      enfermedad: this.visitaForm.value.enfermedad,
      fecha: this.visitaForm.value.fecha.toLocaleString(),
    }
    await addDoc(collection(this.afs, 'visita'), visita)
    this.route.navigate(['/visita']);
  }

}
