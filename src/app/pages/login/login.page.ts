import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonInput, IonButton, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonInput, IonButton, IonItem, IonLabel,
    CommonModule, FormsModule
  ]
})
export class LoginPage {

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async login() {
    const { data, error } = await this.auth.login(this.email, this.password);

    if (error || !data.user) {
      alert('Credenciales incorrectas');
      return;
    }

    const { data: perfil } = await this.auth.getPerfil(data.user.id);

    if (!perfil) {
      alert('Sin perfil asignado en la base de datos');
      return;
    }

    // Redirección según rol
    if (perfil.rol === 'admin') this.router.navigate(['/admin']);
    else this.router.navigate(['/home']);
  }
}
