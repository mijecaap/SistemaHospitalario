import { Component, OnInit, ViewChild } from '@angular/core';
import { addDoc, collection, Firestore, updateDoc, doc as Docum } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Asegurado {
  nombre: string;
  apellido: string;
  dni: string;
  direccion: string;
  celular: string;
  genero: string;
  edad: string;
  rol: string;
  estado: number;
  familia: string[]
}

export interface Familia {
  nombre: string;
  apellido: string;
  dni: string;
  genero: string;
  edad: string;
  rol: string;
  asegurador: string;
  estado: number;
}

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css']
})
export class AgregarPacienteComponent implements OnInit {

  pacienteForm: FormGroup;
  dataSourceAgregar: MatTableDataSource<any>;
  displayedColumnsAgregar: string[] = ['nombre', 'apellido', 'dni', 'rol'];
  @ViewChild("pagAsegurado") pagAsegurado!: MatPaginator;

  asegurado: Asegurado = {
    nombre: '',
    apellido: '',
    dni: '',
    direccion: '',
    celular: '',
    genero: '',
    edad: '',
    rol: '',
    estado: 0,
    familia: [],
  };
  familiaAsegurada: Familia[] = [];
  listIdFamilia: string[] = [];

  listTable: any[] = [];
  disablePareja: boolean = true;

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private route: Router,
  ) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      edad: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      direccion: ['', Validators.required],
      celular: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      genero: ['', Validators.required],
      rol: ['Principal', Validators.required],
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
      this.asegurado.celular = this.pacienteForm.value.celular;
      this.asegurado.genero = this.pacienteForm.value.genero;
      this.asegurado.edad = this.pacienteForm.value.edad;
      this.asegurado.rol = this.pacienteForm.value.rol;
      let table = {
        nombre: this.pacienteForm.value.nombre,
        apellido: this.pacienteForm.value.apellido,
        dni: this.pacienteForm.value.dni,
        rol: this.pacienteForm.value.rol
      }
      this.listTable.push(table);
      this.dataSourceAgregar = new MatTableDataSource(this.listTable);
      this.dataSourceAgregar.paginator = this.pagAsegurado;
      this.resetForm()
    } else {
      let fam: Familia = {
        nombre: this.pacienteForm.value.nombre,
        apellido: this.pacienteForm.value.apellido,
        dni: this.pacienteForm.value.dni,
        genero: this.pacienteForm.value.genero,
        edad: this.pacienteForm.value.edad,
        rol: this.pacienteForm.value.rol,
        asegurador: '',
        estado: 0
      }
      if (this.pacienteForm.value.rol == 'Pareja') {
        this.disablePareja = false;
      }
      let table = {
        nombre: this.pacienteForm.value.nombre,
        apellido: this.pacienteForm.value.apellido,
        dni: this.pacienteForm.value.dni,
        rol: this.pacienteForm.value.rol
      }
      this.familiaAsegurada.push(fam);
      this.listTable.push(table);
      this.dataSourceAgregar = new MatTableDataSource(this.listTable);
      this.dataSourceAgregar.paginator = this.pagAsegurado;
      this.resetForm()
    }
  }

  async enviarPacientes() {
    const doc = await addDoc(collection(this.afs, 'asegurado-principal'), this.asegurado)
    await Promise.all(this.familiaAsegurada.map(async (fam) => {
      fam.asegurador = doc.id;
      const docF = await addDoc(collection(this.afs, 'asegurado-familia'), fam);
      this.listIdFamilia.push(docF.id);
    }))
    const docAse = Docum(this.afs, 'asegurado-principal', doc.id);
    await updateDoc(docAse, {
      familia: this.listIdFamilia
    })
    this.route.navigate(['/paciente']);
  }

  resetForm() {
    this.pacienteForm.patchValue({
      nombre: '',
      apellido: '',
      edad: '',
      genero: '',
      celular: '',
      dni: '',
      rol: ''
    })
    this.pacienteForm.markAsUntouched()
  }

}
