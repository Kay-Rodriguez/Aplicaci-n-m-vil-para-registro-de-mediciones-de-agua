import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonInput, IonButton, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SupabaseService } from 'src/app/services/supabase.service';

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
    private supabase: SupabaseService,
    private router: Router
  ) {}

  // LOGIN NORMAL
  async login() {
    const { data, error } = await this.auth.login(this.email, this.password);

    if (error || !data.user) {
      alert('Credenciales incorrectas');
      return;
    }

    const perfil = await this.auth.getPerfil(data.user.id);

    if (!perfil.data) {
      alert('Sin perfil configurado');
      return;
    }

    if (perfil.data.rol === 'admin') this.router.navigate(['/admin']);
    else this.router.navigate(['/home']);
  }


  // 👇 SUPER IMPORTANTE: CREA USUARIOS POR TI
  async crearUsuarios() {
    //------------------------------------------------------------------
    // 1. CREAR ADMIN
    //------------------------------------------------------------------
    const admin = await this.supabase.supabase.auth.signUp({
      email: "admin@agua.gob",
      password: "Admin123"
    });

    if (admin.error) {
      console.error(admin.error);
      alert("Error creando admin");
      return;
    }

    const adminId = admin.data.user?.id;

    if (adminId) {
      await this.supabase.supabase
        .from("perfiles1")
        .insert({
          id: adminId,
          nombre: "Administrador del sistema",
          rol: "admin"
        });
    }

    //------------------------------------------------------------------
    // 2. CREAR MEDIDOR
    //------------------------------------------------------------------
    const medidor = await this.supabase.supabase.auth.signUp({
      email: "medidor1@agua.gob",
      password: "Medidor123"
    });

    if (medidor.error) {
      console.error(medidor.error);
      alert("Error creando medidor");
      return;
    }

    const medidorId = medidor.data.user?.id;

    if (medidorId) {
      await this.supabase.supabase
        .from("perfiles1")
        .insert({
          id: medidorId,
          nombre: "Medidor zona norte",
          rol: "medidor"
        });
    }

    alert("Usuarios creados correctamente 🎉");
  }
}
