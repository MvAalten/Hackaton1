/**
 * Web-versie van de NFC-lezer.
 *
 * De browser heeft geen NFC-hardware, dus dit bestand simuleert altijd een
 * tag-scan. Metro (de React Native-bundler voor de echte app) gebruikt
 * nfc.ts; webpack (de browser-build) kiest dit bestand automatisch via de
 * .web.ts-extensie, zodat react-native-nfc-manager hier nooit wordt geladen.
 */
import { NFC_MOCK_TAG } from './config';

export async function initNfc(): Promise<void> {}

export async function leesTag(): Promise<string> {
  await new Promise((r) => setTimeout(r, 500));
  return NFC_MOCK_TAG;
}
