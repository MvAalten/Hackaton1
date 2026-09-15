# Starten - De Kast Kiosk

Stap-voor-stap uitleg om het project op te starten. Drie onderdelen:
de **backend** (draait meteen), de **frontend als website** (draait in de browser,
geen emulator nodig) en de **frontend als mobiele app** (optioneel, Android-emulator
of -toestel nodig).

## Snelste route: één script

- **Windows:** `.\start.ps1`
- **Linux:** `./start.sh`

Dit start de backend én de frontend-website elk in een eigen venster (op Windows;
op Linux als je een bekende terminal-emulator hebt, anders backend op de achtergrond).
Je hoeft verder niets handmatig te typen — na een paar seconden staan
**http://127.0.0.1:8000/docs** (backend) en **http://localhost:3000** (frontend) klaar.

> Windows-foutmelding "running scripts is disabled"? Draai dan:
> `powershell -ExecutionPolicy Bypass -File .\start.ps1`

### Losse scripts

Wil je backend en frontend liever apart starten, of gebruik je de mobiele app:

**Windows:**
- **`start-backend.bat`** (dubbelklikken of in een terminal draaien): maakt de virtuele
  omgeving aan als die nog niet bestaat, installeert/actualiseert de dependencies en start
  daarna de server. Opent ook automatisch `http://127.0.0.1:8000/docs` in de browser.
- **`frontend`-map, website:** geen script nodig, gewoon `npm install` en `npm run web`
  (zie sectie 2 hieronder) — draait direct in de browser.
- **`setup-frontend.ps1`**: alleen nodig voor de *mobiele app* (optioneel, sectie 3).
  Automatiseert stap 1-4 van die eenmalige setup (code kopieren, dependencies
  samenvoegen, `index.js` en het manifest patchen, `npm install`). Het enige wat je zelf
  blijft doen is het React Native-project aanmaken (dat commando is interactief).

**Linux (bijv. Arch):**
- **`./start-backend.sh`**: hetzelfde als `start-backend.bat`, maar dan met `python3`/`venv`
  en `xdg-open` om de browser te openen. Vereist Python 3 (`python` of `python3`) en `xdg-open`
  (zit meestal al in `xdg-utils`, op Arch: `sudo pacman -S xdg-utils` als het ontbreekt).
- **`./setup-frontend.sh [pad-naar-DeKastKiosk]`**: hetzelfde als `setup-frontend.ps1`,
  alleen nodig voor de mobiele app. Gebruikt `python3` om `package.json` samen te voegen
  (zit al op je systeem dankzij de backend). Zonder argument wordt `../DeKastKiosk`
  aangenomen. Maak de scripts eenmalig uitvoerbaar met
  `chmod +x start.sh start-backend.sh setup-frontend.sh` (staat al goed in git, maar voor
  de zekerheid).

De handmatige stappen hieronder blijven staan zodat je precies weet wat de scripts doen
en zodat je het ook zonder scripts kunt draaien.

---

## 1. Backend starten (Python + FastAPI)

De backend levert de API en een database met testdata. Dit is het snelst om te draaien.

### Eenmalig: omgeving klaarzetten

Open een terminal in de projectmap en ga naar de backend:

```bash
cd backend
```

Maak een virtuele omgeving aan en installeer de dependencies (alleen de eerste keer):

```bash
python -m venv .venv
```
```bash
.venv\Scripts\activate
```
```bash
pip install -r requirements.txt
```

> **Windows-foutmelding bij `activate`?** ("running scripts is disabled")
> Sla `activate` over en gebruik overal `.venv\Scripts\python.exe ...` in plaats van `python`,
> bijvoorbeeld: `.venv\Scripts\python.exe -m uvicorn app.main:app --reload`

### Elke keer: server starten

```bash
.venv\Scripts\activate
```
```bash
uvicorn app.main:app --reload
```

Je ziet nu: `Uvicorn running on http://127.0.0.1:8000`.

### Uitproberen in de browser

Open: **http://127.0.0.1:8000/docs**

Dit is de automatische API-documentatie. Je kunt er alle vier de flows testen:
klik een endpoint open -> **"Try it out"** -> vul gegevens in -> **"Execute"**.

**Test-tags** (uit de seed-data):

| Tag UID    | Lid           | Abonnement           |
|------------|---------------|----------------------|
| `04A1B2C3` | Anna de Vries | onbeperkt + addendum |
| `04D4E5F6` | Bram Jansen   | 1x per week          |

Voorbeeld: open `POST /toegang/checkin`, "Try it out", vul `{ "tag_uid": "04A1B2C3" }`
in en Execute -> antwoord `toegang toegestaan`.

### Stoppen

Druk `Ctrl + C` in de terminal. De database `de_kast.db` blijft bewaard.
Verwijder dat bestand als je opnieuw met verse testdata wilt beginnen.

---

## 2. Frontend starten als website (react-native-web)

Geen Android Studio, emulator of `DeKastKiosk`-project nodig: de app draait via
`react-native-web` gewoon in je browser. NFC-tags kunnen niet in een browser gelezen
worden, dus checkin gebruikt hier altijd de mocktag `04A1B2C3`.

Eenmalig:

```bash
cd frontend
npm install
```

Elke keer:

```bash
npm run web
```

Dit opent automatisch **http://localhost:3000**. Zorg dat de backend (stap 1) al draait,
anders krijg je "Er ging iets mis. Draait de backend?" te zien.

> `npm run build:web` maakt een productie-build in `frontend/web-dist/` (statische
> HTML/JS), handig als je de kiosk-app ook als website wilt hosten of tonen.

---

## 3. Frontend als mobiele app (React Native / Android, optioneel)

Wil je de app op een echt Android-toestel of -emulator draaien (bv. voor de NFC-lezer
in het echt), dan is dit de weg. Voor een demo is dit niet nodig; sectie 2 volstaat.

De map `frontend/src/` bevat de app-code, maar nog geen compleet React Native-project
(de native Android-map wordt eenmalig gegenereerd). Hiervoor heb je nodig:

- **Node.js** (https://nodejs.org)
- **Android Studio** met een emulator, OF een Android-toestel via USB (met USB-debugging aan)

### Eenmalig: React Native-project maken en deze code erin zetten

Draai dit vanuit de map **boven** dit project, zodat er een map `DeKastKiosk` naast
`Hackaton1` ontstaat:

```bash
npx @react-native-community/cli init DeKastKiosk
```

Draai daarna vanuit deze projectmap:

```powershell
.\setup-frontend.ps1
```

Op Linux:

```bash
./setup-frontend.sh
```

Dit kopieert `src/` erin, neemt de dependencies uit `package.json` over, past `index.js`
aan naar `./src/App`, voegt de NFC-permissie toe aan `AndroidManifest.xml` en draait
`npm install`. Staat `DeKastKiosk` ergens anders, geef dan het pad mee:
`.\setup-frontend.ps1 -TargetPath "C:\pad\naar\DeKastKiosk"` (Windows) of
`./setup-frontend.sh /pad/naar/DeKastKiosk` (Linux).

Handmatig kan ook nog steeds; zet dan uit deze `frontend/`-map het volgende in het
nieuwe project `DeKastKiosk`:

1. Kopieer de hele map `src/` erin.
2. Neem de dependencies uit `package.json` over (of kopieer het bestand) en draai:
   ```bash
   npm install
   ```
3. Laat het nieuwe project `src/App.tsx` gebruiken: pas `index.js` aan zodat die
   `import App from './src/App'` gebruikt.
4. Voeg NFC-permissie toe in `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <uses-permission android:name="android.permission.NFC" />
   ```

### Elke keer: app starten

Zorg dat een emulator draait (of een toestel is aangesloten), dan:

```bash
npm run android
```

### Backend bereikbaar maken vanuit de app

In `frontend/src/config.ts` staat `API_BASE_URL`:

- **Android-emulator:** `http://10.0.2.2:8000` (staat al goed; `10.0.2.2` is de "localhost"
  van je pc, gezien vanaf de emulator).
- **Echt toestel/kiosk:** vul het IP-adres van je pc in, bv. `http://192.168.1.50:8000`.
  (Pc-IP opvragen: `ipconfig` -> "IPv4-adres". Pc en toestel moeten op hetzelfde wifi zitten.)

### Testen zonder NFC-hardware

In `frontend/src/config.ts` staat `NFC_MOCK = true`. De lezer geeft dan de vaste testtag
`04A1B2C3` terug, zodat je de check-in op een emulator kunt testen. Zet op `false` op de
echte kiosk met NFC-lezer.

---

## Samengevat: de kortste route om iets te zien

Windows: `.\start.ps1` — Linux: `./start.sh`. Dit start backend én frontend-website in
één keer; browsers openen vanzelf op **http://127.0.0.1:8000/docs** en
**http://localhost:3000**.

Liever los, of alleen de API testen (Swagger UI)?
1. Windows: dubbelklik `start-backend.bat`. Linux: draai `./start-backend.sh`.
2. De browser opent vanzelf op **http://127.0.0.1:8000/docs**; test daar de flows.
3. Voor de website erbij: in een tweede terminal `cd frontend` -> `npm install`
   (eenmalig) -> `npm run web` -> browser opent op **http://localhost:3000**.

De mobiele (Android) versie is een grotere setup met Android Studio; nodig alleen als
je de app echt op een toestel wilt draaien.
