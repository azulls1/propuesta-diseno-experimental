import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export const SUPABASE_URL = 'https://supabase-maestria.iagentek.com.mx';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJyb2xlIjogImFub24iLCAiaXNzIjogInN1cGFiYXNlIiwgImlhdCI6IDE3MTUwNTA4MDAsICJleHAiOiAxODcyODE3MjAwfQ.U_3JYW_g7O3SGvo-Sip65JHuUrvrmMOW2uDKrha-L1k';

export interface Comment {
  id: number;
  name: string | null;
  message: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private http = inject(HttpClient);

  private headers(extra?: Record<string, string>): HttpHeaders {
    return new HttpHeaders({
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...extra,
    });
  }

  getComments(): Observable<Comment[]> {
    const url = `${SUPABASE_URL}/rest/v1/proposal_comments?select=*&order=created_at.desc&limit=50`;
    return this.http.get<Comment[]>(url, { headers: this.headers() });
  }

  postComment(name: string, message: string): Observable<Comment[]> {
    const url = `${SUPABASE_URL}/rest/v1/proposal_comments`;
    return this.http.post<Comment[]>(
      url,
      { name: name || null, message },
      { headers: this.headers({ Prefer: 'return=representation' }) },
    );
  }
}
