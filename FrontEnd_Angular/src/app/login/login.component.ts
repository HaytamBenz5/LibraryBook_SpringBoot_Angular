import { Component } from '@angular/core';
import {Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  constructor(private router: Router) {}

  navigateToPage() {
    this.router.navigate(['/Home']);
  }

}
