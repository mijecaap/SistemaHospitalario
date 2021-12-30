import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/shared/services/error.service';

interface User {
  uid: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: Auth,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  login() {
    const usuario = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loading = true;
    signInWithEmailAndPassword(this.afAuth, usuario, password).then((rspt) => {
      this.setLocalStorage(rspt.user);
      this.router.navigate(['/inicio'])
      this.loading = false;
    }, error => {
      this.loading = false;
      this.toastr.error(this._errorService.error(error.code), 'Error');
      this.loginForm.reset();
    });
  }

  setLocalStorage(user: any) {
    const usuario: User = {
      uid: user.uid,
      email: user.email
    }
    localStorage.setItem('user', JSON.stringify(usuario));
  }
}
