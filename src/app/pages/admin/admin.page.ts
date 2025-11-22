import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem } from '@ionic/angular/standalone';
import { LecturasService } from 'src/app/services/lecturas.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem,
    CommonModule, FormsModule
  ],  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminPage {

  lecturas: any[] = [];

  constructor(private ls: LecturasService) {}

  async ionViewWillEnter() {
    const { data } = await this.ls.todasLecturas();
    this.lecturas = data ?? [];
  }
}
