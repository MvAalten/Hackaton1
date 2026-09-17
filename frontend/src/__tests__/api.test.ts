/**
 * Tests voor de API-client: controleert dat elke functie het juiste
 * endpoint, method en body gebruikt, en dat een niet-ok response een fout
 * gooit (zie CheckinScreen/CursusScreen/CoachScreen die hierop vangen).
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../config', () => ({ API_BASE_URL: 'http://test-backend' }));

import {
  checkin,
  getCoaches,
  getCursussen,
  planAfspraak,
  schrijfInVoorCursus,
  zegAbonnementOp,
} from '../api';

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  (global.fetch as any) = vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  });
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('api client', () => {
  it('checkin post naar /toegang/checkin met de tag_uid', async () => {
    mockFetchOnce({ toegestaan: true, melding: 'Welkom!', lid_naam: 'Anna de Vries' });

    const result = await checkin('04A1B2C3');

    expect(global.fetch).toHaveBeenCalledWith(
      'http://test-backend/toegang/checkin',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ tag_uid: '04A1B2C3' }) }),
    );
    expect(result).toEqual({ toegestaan: true, melding: 'Welkom!', lid_naam: 'Anna de Vries' });
  });

  it('getCursussen doet een GET naar /cursussen', async () => {
    mockFetchOnce([{ id: 1, naam: 'yoga', max_deelnemers: 10 }]);

    const result = await getCursussen();

    expect(global.fetch).toHaveBeenCalledWith('http://test-backend/cursussen', expect.anything());
    expect(result).toHaveLength(1);
  });

  it('schrijfInVoorCursus stuurt lid_id en cursus_id mee', async () => {
    mockFetchOnce({ ok: true, melding: 'Inschrijving bevestigd.' });

    await schrijfInVoorCursus(1, 3);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://test-backend/cursussen/inschrijven',
      expect.objectContaining({ body: JSON.stringify({ lid_id: 1, cursus_id: 3 }) }),
    );
  });

  it('zegAbonnementOp stuurt lid_id en bevestigd mee', async () => {
    mockFetchOnce({ ok: true, melding: 'Abonnement opgezegd per einde van de periode.' });

    await zegAbonnementOp(2, true);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://test-backend/abonnementen/opzeggen',
      expect.objectContaining({ body: JSON.stringify({ lid_id: 2, bevestigd: true }) }),
    );
  });

  it('getCoaches doet een GET naar /afspraken/coaches', async () => {
    mockFetchOnce([{ id: 1, naam: 'Coach Sanne' }]);

    await getCoaches();

    expect(global.fetch).toHaveBeenCalledWith('http://test-backend/afspraken/coaches', expect.anything());
  });

  it('planAfspraak stuurt alle velden mee', async () => {
    mockFetchOnce({ ok: true, melding: 'Afspraak bevestigd.' });

    await planAfspraak(1, 2, '2026-10-01', '10:00:00');

    expect(global.fetch).toHaveBeenCalledWith(
      'http://test-backend/afspraken/plannen',
      expect.objectContaining({
        body: JSON.stringify({ lid_id: 1, coach_id: 2, datum: '2026-10-01', tijd: '10:00:00' }),
      }),
    );
  });

  it('gooit een fout met statuscode als de response niet ok is', async () => {
    mockFetchOnce(null, false, 500);

    await expect(getCursussen()).rejects.toThrow('API-fout 500 bij /cursussen');
  });
});
