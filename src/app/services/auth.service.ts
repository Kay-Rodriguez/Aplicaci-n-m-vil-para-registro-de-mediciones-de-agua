import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(public supabaseSvc: SupabaseService) {}

  // LOGIN
  async login(email: string, password: string) {
    return await this.supabaseSvc.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  // PERFIL
  async getPerfil(userId: string) {
    return await this.supabaseSvc.supabase
      .from('perfiles1')
      .select('rol')
      .eq('id', userId)
      .single();
  }

  // USUARIO ACTUAL
  async getUser() {
    return (await this.supabaseSvc.supabase.auth.getUser()).data.user;
  }
  
}
