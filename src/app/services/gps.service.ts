import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })
export class GpsService {

  async getPosition() {
    const pos = await Geolocation.getCurrentPosition();
    return {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      mapUrl: `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`
    };
  }
}
