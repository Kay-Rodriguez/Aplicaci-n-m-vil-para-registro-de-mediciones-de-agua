import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonItem, IonInput, IonTextarea, IonButton, IonLabel
} from '@ionic/angular/standalone';

import { CameraService } from 'src/app/services/camera.service';
import { GpsService } from 'src/app/services/gps.service';
import { AuthService } from 'src/app/services/auth.service';
import { LecturasService } from 'src/app/services/lecturas.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-nueva-lectura',
  templateUrl: './nueva-lectura.page.html',
  styleUrls: ['./nueva-lectura.page.scss'],
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonLabel, IonInput, IonTextarea, IonButton,
    CommonModule, FormsModule
  ],  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NuevaLecturaPage {

  valor = '';
  observaciones = '';
  fotoMedidor = '';
  fotoFachada = '';

  constructor(
    private camera: CameraService,
    private gps: GpsService,
    private auth: AuthService,
    private lecturas: LecturasService
  ) {}

  async tomarMedidor() { this.fotoMedidor = await this.camera.takePicture(); }
  async tomarFachada() { this.fotoFachada = await this.camera.takePicture(); }

  async guardar() {
    const user = await this.auth.getUser();
    if (!user) return;

    const pos = await this.gps.getPosition();

    const urlMedidor = await this.camera.upload(this.fotoMedidor, 'medidor');
    const urlFachada = await this.camera.upload(this.fotoFachada, 'fachada');

    await this.lecturas.guardarLectura({
      usuario_id: user.id,
      valor_lectura: this.valor,
      observaciones: this.observaciones,
      lat: pos.lat,
      lng: pos.lng,
      foto_medidor: urlMedidor,
      foto_fachada: urlFachada
    });

    alert('Lectura guardada');
  }
}
