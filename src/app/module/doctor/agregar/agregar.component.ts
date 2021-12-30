import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Enfermedad } from '../../enfermedad/agregar-enfermedad/agregar-enfermedad.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  doctorForm: FormGroup;

  listEnfermedad: Enfermedad[] = []

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private route: Router,
  ) {
    this.doctorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      especialidad: ['', Validators.required],
    })
    this.leerEnfermedades()
  }

  ngOnInit(): void {
  }

  agregar() {
    let doctor = {
      nombre: this.doctorForm.value.nombre,
      apellido: this.doctorForm.value.apellido,
      dni: this.doctorForm.value.dni,
      especialidad: this.doctorForm.value.especialidad
    }
    addDoc(collection(this.afs, 'doctor'), doctor)
    this.route.navigate(['/doctor']);
  }

  async leerEnfermedades() {
    const querySnapshot = await getDocs(collection(this.afs, 'enfermedad'));
    querySnapshot.forEach((doc) => {
      this.listEnfermedad.push(doc.data() as Enfermedad);
    })
  }
}
