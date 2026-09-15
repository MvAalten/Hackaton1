# Frontend - De Kast Kiosk (React Native)

De kiosk-app voor de Android-terminal. Bevat een menu met de vier flows, een
NFC-lezer (met mock-modus) en een API-client naar de backend.

## Belangrijk: dit is de broncode, nog geen volledig project

In deze map staat de `src/` met alle app-code, plus `package.json` en
`tsconfig.json`. De **native Android-projectbestanden** (map `android/`) zitten
er bewust niet in - die genereer je één keer met de React Native CLI.

### Eenmalig een React Native-project genereren en deze code erin zetten

```bash
# 1. Genereer een kaal React Native-project (buiten deze map)
npx @react-native-community/cli init DeKastKiosk

# 2. Kopieer uit deze frontend-map:
#    - de hele src/-map
#    - package.json (of neem de dependencies over in het nieuwe project)
#    Vervang vervolgens de gegenereerde index.js/App zodat die src/App.tsx gebruikt.

# 3. Installeer de dependencies
npm install

# 4. NFC-plugin: react-native-nfc-manager vereist NFC-permissie in
#    android/app/src/main/AndroidManifest.xml:
#      <uses-permission android:name="android.permission.NFC" />

# 5. Start op een emulator of aangesloten Android-toestel
npm run android
```

## Ontwikkelen zonder NFC-hardware

In [`src/config.ts`](src/config.ts) staat `NFC_MOCK = true`. Dan geeft de lezer
een vaste testtag (`04A1B2C3`, lid Anna) terug, zodat je de check-in-flow op een
emulator kunt testen. Zet op `false` op de echte kiosk.

## Backend bereikbaar maken

`API_BASE_URL` in `src/config.ts`:
- Android-emulator: `http://10.0.2.2:8000` (staat al ingesteld)
- Echte kiosk: het IP van de pc waarop de backend draait, bv. `http://192.168.1.50:8000`

## Structuur

```
frontend/src/
  App.tsx            # menu + schermwisseling
  config.ts          # API-URL en NFC-mock instelling
  api.ts             # alle backend-aanroepen op één plek
  nfc.ts             # NFC-tag uitlezen (met mock)
  screens/
    CheckinScreen.tsx    # Flow 1
    CursusScreen.tsx     # Flow 2
    OpzeggenScreen.tsx   # Flow 3
    CoachScreen.tsx      # Flow 4
```

## Wat bouwen jullie zelf (zie `TODO` in de code)

- Na het scannen onthouden welk lid is ingelogd, en dat `lid_id` in de andere
  schermen gebruiken (staat nu nog hardcoded).
- In CoachScreen een echt datum/tijd-keuzescherm i.p.v. een vast moment.
- Nette laad-/foutstatussen en styling.
