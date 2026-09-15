/**
 * Instellingen van de app.
 *
 * API_BASE_URL wijst naar de FastAPI-backend.
 * - Android-emulator: gebruik 10.0.2.2 (dat is de "localhost" van je pc vanaf de emulator).
 * - Echte kiosk/telefoon: vul hier het IP-adres van de pc in waarop de backend draait,
 *   bv. 'http://192.168.1.50:8000'.
 */
export const API_BASE_URL = 'http://10.0.2.2:8000';

/**
 * Zet op true om de NFC-lezer te simuleren (handig tijdens ontwikkelen zonder
 * fysieke tag of op een emulator zonder NFC). Zie src/nfc.ts.
 */
export const NFC_MOCK = true;

/** Tag die de mock teruggeeft - komt overeen met een lid uit de seed-data. */
export const NFC_MOCK_TAG = '04A1B2C3';
