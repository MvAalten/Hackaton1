# Het toegangssysteem van De Kast

Bij De Kast staat één apparaat centraal: een kiosk met touchscreen en een ingebouwde NFC-lezer, bij de ingang. Sporters houden hun RFID-tag ertegenaan. Datzelfde apparaat regelt dan alles: toegang bijhouden, cursussen inschrijven, abonnement opzeggen en contact met een personal coach. Er is geen apart slot nodig, want de deur gaat niet echt op slot — het systeem houdt alleen bij wie er komt.

De lezer gebruikt **NFC**. Dit is een moderne vorm van RFID en werkt gewoon met de gangbare Mifare-tags. De kiosk leest het unieke nummer van de tag. Met dat nummer zoekt het systeem op wie het lid is en wat zijn abonnement is.

Vanaf hetzelfde scherm kan een sporter vier dingen doen:
- **Inchecken** — het systeem checkt het abonnement en hoe vaak je al bent geweest
- **Cursus inschrijven** — yoga, pilates of paaldansen, als je dit erbij hebt
- **Abonnement opzeggen**
- **Afspraak maken met een coach**

Technisch bestaat het systeem uit twee delen. De kiosk draait een **React Native-app**, die praat met een **backend in Python (FastAPI)**. Alle gegevens staan in een simpele database (SQLite). Dit houdt het geheel klein en overzichtelijk: één apparaat, twee programmeertalen, en genoeg om het idee goed te laten zien.

## Hardware: Sunmi CPad 11"

Als kiosk-apparaat is gekozen voor de **Sunmi CPad 11"** (€535).

- **Scherm:** 11" touchscreen — ruim genoeg voor het menu
- **NFC-lezer:** ingebouwd, ondersteunt Mifare-tags (13,56 MHz) — precies wat de RFID-polsbandjes/kaarten gebruiken
- **Besturingssysteem:** Android 14 met GMS, dus geschikt voor een React Native-app
- **Waarom deze en niet een duurder model:** andere Sunmi-modellen (zoals de V3 Mix, €605) hebben ook een ingebouwde printer en barcodescanner. Die functies zijn niet nodig voor dit systeem, dus is gekozen voor een model zonder die overbodige (en duurdere) extra's.
- **Prijs binnen budget:** €535 van het budget van €2000, met ruimte over voor bijvoorbeeld montage, een tweede kiosk of hosting van de backend.

## Waarom deze techstack

**Terminal app: React Native**
De kiosk draait Android, maar hoeft niet per se native gebouwd te worden. React Native maakt een echte Android-app, alleen dan met JavaScript/TypeScript in plaats van Kotlin. Dit is handig als het team al bekend is met web-technologie: je hoeft geen nieuwe taal te leren, en kunt sneller aan de slag. De NFC-lezer is bereikbaar via een plugin (bijvoorbeeld `react-native-nfc-manager`), die de Android NFC-functies voor je aanroept.

**Backend / API: Python + FastAPI**
Python is makkelijk te lezen en snel te schrijven, ook voor mensen die er nog niet veel ervaring mee hebben. FastAPI maakt het bouwen van een API extra simpel: het maakt automatisch documentatie van je API, en checkt vanzelf of binnenkomende data klopt. Dat scheelt tijd en fouten, zeker in een project met een deadline.

**Database: SQLite**
SQLite is een database die in één bestand past, zonder dat je een aparte databaseserver hoeft op te zetten. Voor een prototype met één kiosk is dit ruim voldoende, en het scheelt installatie- en configuratiewerk. Pas als het systeem naar meerdere locaties of kiosks tegelijk groeit, wordt overstappen naar iets als PostgreSQL de moeite waard.

**Communicatie: REST API over HTTP(S)**
REST is een simpel en veelgebruikt patroon om een app met een backend te laten praten: de kiosk stuurt een verzoek (bijvoorbeeld "check deze tag"), en de backend stuurt een antwoord terug. Het is goed gedocumenteerd, makkelijk te testen, en er is zoveel voorbeeldmateriaal over te vinden dat je nooit vastloopt. HTTPS zorgt er daarbij voor dat de gegevens onderweg versleuteld zijn.

**Samengevat:** deze keuzes leunen allemaal op dezelfde gedachte — gebruik technologie die veelgebruikt, goed gedocumenteerd en snel te leren is, zodat de meeste tijd naar de eigenlijke functionaliteit gaat in plaats van naar het worstelen met de tools zelf.
