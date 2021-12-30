import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(
    private router: Router,
    private afAuth: Auth
  ) { }

  ngOnInit(): void {
  }

  onItemSelected(link: string) {
    this.router.navigate([link])
  }

  logOut() {
    signOut(this.afAuth);
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

}
