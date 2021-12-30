import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code: string): string {
    switch (code) {
      // Email ya registrado
      case 'auth/email-already-in-use':
        return 'El Correo ya esta registrado';

      // Correo inválido
      case 'auth/invalid-email':
        return 'El Correo es inválido';

      // La Contraseña es muy débil
      case 'auth/weak-password':
        return 'La contraseña es muy débil'

      //Usuario no encontrado
      case 'auth/user-not-found':
        return 'Usuario inválido'

      // Contraseña incorrecta
      case 'auth/wrong-password':
        return 'Contraseña incorrecta'

      default:
        return 'Error desconocido';
    }
  }

}