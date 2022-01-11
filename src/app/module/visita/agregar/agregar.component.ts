import { Component, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Doctor } from '../../doctor/doctor.component';
import { Asegurado, Familia } from '../../paciente/agregar-paciente/agregar-paciente.component';

export interface Area {
  nombre: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  listAsegurado: Asegurado[] = [];
  listEspecialidad: Area[] = [];
  listDoctor: Doctor[] = [];
  tablaAsegurado: string = '';
  idAsegurado: string = '';

  visitaForm: FormGroup;

  options: string[] = [];
  filteredOptions: Observable<string[]>;

  siguientePaso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.visitaForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      enfermedad: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: [, [Validators.required, Validators.min(8), Validators.max(16)]]
    })
    this.leerDNI();
    this.filteredOptions = this.visitaForm.controls['dni'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
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
    this.filteredOptions = this.visitaForm.controls['dni'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  async leerEnfermedades() {
    const querySnapshot = await getDocs(collection(this.afs, 'especialidad'));
    querySnapshot.forEach((doc) => {
      this.listEspecialidad.push(doc.data() as Area);
    })
  }

  async leerDoctores(e: any) {
    let esp = e.target.value;
    const q = query(collection(this.afs, 'doctor'), where('especialidad', '==', esp))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.listDoctor.push(doc.data() as Doctor)
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  async agregar() {
    let visita = {
      dni: this.visitaForm.controls['dni']?.value,
      area: this.visitaForm.value.enfermedad,
      doctor: this.visitaForm.value.doctor,
      fecha: this.visitaForm.value.fecha.toLocaleString(),
      hora: this.visitaForm.value.hora
    }
    await addDoc(collection(this.afs, 'visita'), visita)
    const ref = doc(this.afs, `asegurado-${this.tablaAsegurado}`, this.idAsegurado);
    await updateDoc(ref, {
      estado: 1
    })
    this.route.navigate(['/visita']);
  }

  async verificarDni() {
    const q = query(collection(this.afs, 'asegurado-principal'), where('dni', '==', this.visitaForm.value.dni));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const q2 = query(collection(this.afs, 'asegurado-familia'), where('dni', '==', this.visitaForm.value.dni));
      const querySnapshot2 = await getDocs(q2);
      if (querySnapshot2.empty) {
        this.toastr.error('No se encontró ninguno asegurado con ese dni', 'DNI INCORRECTO', {
          positionClass: 'toast-bottom-right'
        })
      } else {
        querySnapshot2.forEach((doc) => {
          this.idAsegurado = doc.id;
          this.tablaAsegurado = 'familia'
        })
        this.siguientePaso = true;
      }
    } else {
      querySnapshot.forEach((doc) => {
        this.idAsegurado = doc.id;
        this.tablaAsegurado = 'principal'
      })
      this.siguientePaso = true;
    }
    if (this.siguientePaso) {
      this.visitaForm.controls['dni'].disable();
      const ref = doc(this.afs, `asegurado-${this.tablaAsegurado}`, this.idAsegurado)
      const docSnap = await getDoc(ref);
      if (docSnap.data()!.estado == 0) {
        let a: Area = {
          nombre: 'Medicina General'
        }
        this.listEspecialidad.push(a);
      } else if (docSnap.data()!.estado == 1) {
        this.leerEnfermedades();
      }

    }
  }

}
