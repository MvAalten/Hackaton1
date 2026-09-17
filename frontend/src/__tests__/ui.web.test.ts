/**
 * Regressietest voor de bug die we vonden: react-native-web's Alert.alert is
 * een no-op, waardoor Cursus/Coach-meldingen niet verschijnen en het
 * opzeg-scherm de backend nooit aanriep. ui.web.ts lost dit op met
 * window.alert/window.confirm - deze test bewaakt dat dat zo blijft.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
});

describe('ui.web', () => {
  it('toonMelding roept window.alert aan met titel en boodschap', async () => {
    const alertSpy = vi.fn();
    (globalThis as any).window = { alert: alertSpy, confirm: vi.fn() };

    const { toonMelding } = await import('../ui.web');
    toonMelding('Gelukt', 'Inschrijving bevestigd.');

    expect(alertSpy).toHaveBeenCalledWith('Gelukt\n\nInschrijving bevestigd.');
  });

  it('vraagBevestiging voert de actie uit als de gebruiker bevestigt', async () => {
    const confirmSpy = vi.fn(() => true);
    (globalThis as any).window = { alert: vi.fn(), confirm: confirmSpy };

    const { vraagBevestiging } = await import('../ui.web');
    const actie = vi.fn();
    vraagBevestiging('Weet je het zeker?', 'Wil je opzeggen?', 'Ja, opzeggen', actie);

    expect(confirmSpy).toHaveBeenCalledWith('Weet je het zeker?\n\nWil je opzeggen?');
    expect(actie).toHaveBeenCalledTimes(1);
  });

  it('vraagBevestiging voert de actie NIET uit als de gebruiker annuleert', async () => {
    const confirmSpy = vi.fn(() => false);
    (globalThis as any).window = { alert: vi.fn(), confirm: confirmSpy };

    const { vraagBevestiging } = await import('../ui.web');
    const actie = vi.fn();
    vraagBevestiging('Weet je het zeker?', 'Wil je opzeggen?', 'Ja, opzeggen', actie);

    expect(actie).not.toHaveBeenCalled();
  });
});
