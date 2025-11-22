import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class CameraService {

  constructor(private supabase: SupabaseService) {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.Base64
    });

    return image.base64String!;
  }

  decode(base64: string) {
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  }

  async upload(base64: string, prefix: string) {
    const name = `${prefix}-${Date.now()}.jpg`;

    const { error } = await this.supabase.supabase.storage
      .from('fotos')
      .upload(name, this.decode(base64), {
        contentType: 'image/jpeg'
      });

    if (error) throw error;
const { data } = this.supabase.supabase
  .storage
  .from('fotos')
  .getPublicUrl(name);

return data.publicUrl;
    }
}
