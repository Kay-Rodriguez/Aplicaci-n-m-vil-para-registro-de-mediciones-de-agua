import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonItem, IonLabel, IonButton
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { LecturasService } from 'src/app/services/lecturas.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonItem, IonLabel, IonButton,
    CommonModule, FormsModule
  ],  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  lecturas: any[] = [];

  constructor(private auth: AuthService, private ls: LecturasService) {}

async ionViewWillEnter() {
  const user = await this.auth.getUser();
  if (!user) return;

  const { data } = await this.ls.lecturasDeUsuario(user.id);
  this.lecturas = data ?? [];
}

}
