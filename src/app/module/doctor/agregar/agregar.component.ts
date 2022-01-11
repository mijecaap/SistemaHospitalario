import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { getDownloadURL, percentage, ref, Storage, uploadBytes, uploadString } from '@angular/fire/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Especialidad } from '../../enfermedad/enfermedad.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  doctorForm: FormGroup;
  uploadPercent!: Observable<number>;

  listEnfermedad: Especialidad[] = []
  photo: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDFJynDS0eyoX3ZyA5JCrqtv9a6Fn0tLtEuJr22cl-eddnYK6fO3-V8SGTy8v1lPV704&usqp=CAU";
  photoSend!: File;

  @ViewChild('inPhoto') inPhoto!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private str: Storage,
    private route: Router,
    private _sanitizer: DomSanitizer,
  ) {
    this.doctorForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      celular: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      especialidad: ['', [Validators.required]],
      photo: ['', [Validators.required]]
    })
    this.leerEnfermedades()
  }

  ngOnInit(): void {
  }

  async agregar() {
    const storageRef = ref(this.str, `doctor-foto/${this.photoSend.name}`);
    const task = uploadBytes(storageRef, this.photoSend);
    await task;
    const url = await getDownloadURL(storageRef);
    let doctor = {
      nombre: this.doctorForm.value.nombre,
      apellido: this.doctorForm.value.apellido,
      dni: this.doctorForm.value.dni,
      celular: this.doctorForm.value.celular,
      especialidad: this.doctorForm.value.especialidad,
      foto: url
    }
    addDoc(collection(this.afs, 'doctor'), doctor)
    this.route.navigate(['/doctor']);
  }

  async leerEnfermedades() {
    const querySnapshot = await getDocs(collection(this.afs, 'especialidad'));
    querySnapshot.forEach((doc) => {
      this.listEnfermedad.push(doc.data() as Especialidad);
    })
  }

  cntrl_openPhotoModal() {
    this.inPhoto.nativeElement.click();
  }

  fn_getPhotoUrl(): SafeUrl {
    return this._sanitizer.bypassSecurityTrustUrl(this.photo);
  }

  onFileChange(event: any) {
    this.photoSend = event.target.files[0];
    this.photo = URL.createObjectURL(this.photoSend)
  }

}
