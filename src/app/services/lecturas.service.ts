import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class LecturasService {

  constructor(private supabaseSvc: SupabaseService) {}

  async guardarLectura(body: any) {
    return await this.supabaseSvc.supabase.from('lecturas').insert(body);
  }

  async lecturasDeUsuario(userId: string) {
    return await this.supabaseSvc.supabase
      .from('lecturas')
      .select('*')
      .eq('usuario_id', userId)
      .order('created_at', { ascending: false });
  }

  async todasLecturas() {
    return await this.supabaseSvc.supabase
      .from('lecturas')
      .select('*')
      .order('created_at', { ascending: false });
  }
}
