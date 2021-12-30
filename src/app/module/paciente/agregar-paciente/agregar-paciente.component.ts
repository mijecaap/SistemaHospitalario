import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Asegurado {
  nombre: string;
  apellido: string;
  dni: string;
  direccion: string;
  rol: string;
  familia: Familia[]
}

export interface Familia {
  nombre: string;
  apellido: string;
  dni: string;
  rol: string;
}

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent implements OnInit {

  pacienteForm: FormGroup;
  dataSourceAgregar: MatTableDataSource<any>;
  displayedColumnsAgregar: string[] = ['nombre', 'dni', 'rol'];

  asegurado: Asegurado = { nombre: '', apellido: '', dni: '', direccion: '', rol: '', familia: [] }
  listTable: any[] = [];

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private route: Router,
  ) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      rol: ['', Validators.required],
    })
    this.dataSourceAgregar = new MatTableDataSource(this.listTable);
  }

  ngOnInit(): void {
  }

  agregar() {
    if (this.listTable.length == 0) {
      this.asegurado.nombre = this.pacienteForm.value.nombre;
      this.asegurado.apellido = this.pacienteForm.value.apellido;
      this.asegurado.dni = this.pacienteForm.value.dni;
      this.asegurado.direccion = this.pacienteForm.value.direccion;
      this.asegurado.rol = this.pacienteForm.value.rol;
      let table = {
        nombre: this.pacienteForm.value.nombre,
        dni: this.pacienteForm.value.dni,
        rol: this.pacienteForm.value.rol
      }
      this.listTable.push(table);
      this.dataSourceAgregar = new MatTableDataSource(this.listTable);
      this.resetForm()
    } else {
      let fam: Familia = {
        nombre: this.pacienteForm.value.nombre,
        apellido: this.pacienteForm.value.apellido,
        dni: this.pacienteForm.value.dni,
        rol: this.pacienteForm.value.rol
      }
      let table = {
        nombre: this.pacienteForm.value.nombre,
        dni: this.pacienteForm.value.dni,
        rol: this.pacienteForm.value.rol
      }
      this.asegurado.familia.push(fam);
      this.listTable.push(table);
      this.dataSourceAgregar = new MatTableDataSource(this.listTable);
      this.resetForm()
    }
  }

  async enviarPacientes() {
    const doc = await addDoc(collection(this.afs, 'asegurado'), this.asegurado)
    this.route.navigate(['/paciente']);
  }

  resetForm() {
    this.pacienteForm.patchValue({
      nombre: '',
      apellido: '',
      dni: '',
      rol: ''
    })
    this.pacienteForm.markAsUntouched()
  }

}
