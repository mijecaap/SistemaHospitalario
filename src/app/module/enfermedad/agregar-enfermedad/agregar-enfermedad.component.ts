import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface Enfermedad {
  nombre: string;
  gravedad: number;
}

@Component({
  selector: 'app-agregar-enfermedad',
  templateUrl: './agregar-enfermedad.component.html',
  styleUrls: ['./agregar-enfermedad.component.css']
})
export class AgregarEnfermedadComponent {

  enfermedadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private route: Router
  ) {
    this.enfermedadForm = this.fb.group({
      nombre: ['', Validators.required],
      gravedad: [0, Validators.required],
    })
  }

  async agregar() {
    let enfermedad: Enfermedad = {
      nombre: this.enfermedadForm.value.nombre,
      gravedad: parseInt(this.enfermedadForm.value.gravedad),
    }
    const doc = await addDoc(collection(this.afs, 'enfermedad'), enfermedad)
    this.route.navigate(['/enfermedad']);
  }

}
