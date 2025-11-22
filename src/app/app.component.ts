import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    IonicModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]   // 👈 AGREGA ESTO
})
export class AppComponent {}
