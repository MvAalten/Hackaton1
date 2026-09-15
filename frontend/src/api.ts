/**
 * API-client: alle communicatie met de FastAPI-backend loopt via dit bestand.
 *
 * Elke functie komt overeen met één endpoint. Voeg nieuwe endpoints hier toe
 * zodat de rest van de app niet direct met fetch/URLs hoeft te werken.
 */
import { API_BASE_URL } from './config';

/** Kleine helper rond fetch: bouwt de URL, stuurt JSON en leest JSON terug. */
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API-fout ${res.status} bij ${path}`);
  }
  return res.json() as Promise<T>;
}

// --- Types (spiegelen de schema's van de backend) ---
export type CheckinUit = { toegestaan: boolean; melding: string; lid_naam?: string | null };
export type Cursus = { id: number; naam: string; beschrijving?: string; max_deelnemers: number };
export type Coach = { id: number; naam: string; specialisatie?: string };
export type StandaardUit = { ok: boolean; melding: string };

// --- Flow 1: inchecken ---
export function checkin(tagUid: string) {
  return request<CheckinUit>('/toegang/checkin', {
    method: 'POST',
    body: JSON.stringify({ tag_uid: tagUid }),
  });
}

// --- Flow 2: cursussen ---
export function getCursussen() {
  return request<Cursus[]>('/cursussen');
}
export function schrijfInVoorCursus(lidId: number, cursusId: number) {
  return request<StandaardUit>('/cursussen/inschrijven', {
    method: 'POST',
    body: JSON.stringify({ lid_id: lidId, cursus_id: cursusId }),
  });
}

// --- Flow 3: abonnement opzeggen ---
export function zegAbonnementOp(lidId: number, bevestigd: boolean) {
  return request<StandaardUit>('/abonnementen/opzeggen', {
    method: 'POST',
    body: JSON.stringify({ lid_id: lidId, bevestigd }),
  });
}

// --- Flow 4: coach-afspraak ---
export function getCoaches() {
  return request<Coach[]>('/afspraken/coaches');
}
export function planAfspraak(lidId: number, coachId: number, datum: string, tijd: string) {
  return request<StandaardUit>('/afspraken/plannen', {
    method: 'POST',
    body: JSON.stringify({ lid_id: lidId, coach_id: coachId, datum, tijd }),
  });
}
