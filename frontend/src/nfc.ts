/**
 * NFC-lezer.
 *
 * Leest het unieke nummer (UID) van een Mifare-tag uit. De echte kiosk gebruikt
 * de ingebouwde NFC-lezer via react-native-nfc-manager. Op een emulator of pc
 * zonder NFC zet je NFC_MOCK op true in config.ts; dan geeft leesTag() een vaste
 * testtag terug.
 */
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

import { NFC_MOCK, NFC_MOCK_TAG } from './config';

/** Start de NFC-module (één keer bij het opstarten van de app aanroepen). */
export async function initNfc(): Promise<void> {
  if (NFC_MOCK) return;
  await NfcManager.start();
}

/**
 * Wacht tot er een tag tegen de lezer wordt gehouden en geeft de UID terug
 * als hoofdletter-hexstring (bv. "04A1B2C3").
 */
export async function leesTag(): Promise<string> {
  if (NFC_MOCK) {
    // Simuleer een korte leestijd en geef de testtag terug.
    await new Promise((r) => setTimeout(r, 500));
    return NFC_MOCK_TAG;
  }

  try {
    await NfcManager.requestTechnology(NfcTech.NfcA);
    const tag = await NfcManager.getTag();
    const idBytes: number[] = (tag?.id as unknown as number[]) ?? [];
    return idBytes
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  } finally {
    // Altijd de lezer weer vrijgeven, ook bij een fout.
    await NfcManager.cancelTechnologyRequest().catch(() => {});
  }
}
