# Projectleeswijzer — Sportschool SAAS

**Hackaton 1 · Software Developer (niveau 4)**
**Versie 4.0**

Onderdeel van module: Hackaton
Vervolg na dit project: Hackaton 2

---

## Versiebeheer

| Versie | Auteur | Datum | Aanpassing |
|---|---|---|---|
| 1.0.0 | Bart Kuppeveld | Aug. 2022 | Initieel document |
| 1.0.1 | Bart Kuppeveld | — | Werkprocessen aangepast |
| 3.0 | — | Jul. 2026 | Casus herschreven op examenniveau; requirements omgezet in user stories; deze sessie gericht op de werkproces-combinatie B1-K1-W2 + W3 + W4; realistische tijdsinschatting op basis van 4 u/week; US-selectievarianten toegevoegd; bewijslast per werkproces voorgesteld; externe hulpbronlink verwijderd |
| 4.0 | — | Aug. 2026 | Bewijslast W2 (ontwerpen) uitgelijnd met de Ontwerpcoach: alleen een echt activiteitendiagram (geen flowchart) telt voor de logica-laag, use case diagram én wireframe/mock-up beide verplicht voor de gebruikerslaag, dbdiagram.io/PlantUML als vaste tools met verplichte render-check; expliciete verwijzing naar de Ontwerpcoach en studenthandleiding als werkwijze voor Fase 1; percentage-criteria van W3/W4 uit de beoordelingsonderlegger expliciet gekoppeld aan de scope van de gekozen kernflow |

---

## Meta-data van het project

| | |
|---|---|
| Beschikbare tijd | **4 lesuren per week × 3 weken = 12 uur** (individueel, onder begeleiding) |
| Voorkennis | Basis programmeren (OOP), datamodellering, versiebeheer, testen |
| Kerntaak | B1-K1: Realiseert software |
| Werkprocessen — **deze sessie** | B1-K1-W2 Ontwerpt software · B1-K1-W3 Realiseert (onderdelen van) software · B1-K1-W4 Test software |
| Werkvormen / leeractiviteiten | Projectmatig, pressure cooker |
| Technische omgeving | Naar eigen onderzoek en onderbouwde keuze |
| Groepsgrootte | Individueel |
| Ontwikkelmethode | Scrum / Agile |
| Softskills | Presenteren, communiceren |
| Manier van oplevering | Product review(s), retrospective(s), afsluitende video |

---

## Korte beschrijving van de module

De module **Hackaton** staat in het teken van je examen. In een reeks pressure cookers oefen je onder tijdsdruk de mentaliteit en de werkwijze die je op het praktijkexamen nodig hebt. Iedere Hackaton duurt drie weken met **circa 4 uur per week**, en iedere week staat in het teken van een andere discipline:

1. **Week 1 — Ontwerpen.** Je vertaalt de klantvraag naar een functioneel en technisch ontwerp (werkproces B1-K1-W2).
2. **Week 2 — Realiseren.** Je bouwt een MVP (Minimal Viable Product) van (een onderdeel van) de applicatie (werkproces B1-K1-W3).
3. **Week 3 — Testen en optimaliseren.** Je test de applicatie systematisch, trekt conclusies en verbetert waar nodig (werkproces B1-K1-W4). Je sluit af met een video waarin je het product uitlegt.

Deze leeswijzer beschrijft de casus, de eisen en wensen (als user stories) en de voorgestelde bewijslast per werkproces. De **beoordeling zelf staat niet in dit document**; die vindt plaats aan de hand van het aparte beoordelingsformulier op basis van de beoordelingsonderlegger.

### Werkproces-combinatie per sessie

Dit schooljaar draaien er meerdere Hackaton-sessies achter elkaar, telkens met een **andere casus**. Om alle werkprocessen van kerntaak B1-K1 (en later B1-K2) over het jaar te dekken, ligt de focus **per sessie op een andere combinatie van werkprocessen**. Zo bouw je gefaseerd het volledige examenbeeld op zonder elke keer alles tegelijk te hoeven doen.

**Deze sessie (Sportschool "De Kast") = B1-K1-W2 + B1-K1-W3 + B1-K1-W4** (ontwerpen → realiseren → testen). De overige werkprocessen (W1 plannen, W5 verbetervoorstellen, en de W2-werkprocessen van B1-K2) komen in andere sessies aan bod. Houd er rekening mee dat de weging en de diepgang per werkproces kunnen verschillen afhankelijk van de sessie waarin ze centraal staan.

---

## De casus — Sportschool "De Kast"

Sportschool **De Kast** is een groeiende sportschool met meerdere faciliteiten, maar met een structureel personeelstekort. De directie wil dat receptiepersoneel kan bijspringen op de werkvloer. Daarom onderzoekt De Kast of de taken van de receptie (deels) geautomatiseerd kunnen worden met software.

De taken die de receptionist nu handmatig uitvoert:

- Sporters toegang verlenen op basis van hun abonnementstype.
- Sporters inschrijven voor cursussen.
- Abonnementen annuleren.
- Afspraken inplannen met een personal coach.

**Abonnementstypen bij De Kast:**

- 1× per week
- 2× per week
- Onbeperkt
- Cursus-addendum (aanvulling op een bestaand abonnement waarmee de sporter cursussen mag volgen)

Voor het prototype volstaan **drie cursussen**: yoga, pilates en paaldansen.

### Wat verwacht de klant

De klant vraagt een **concept voor een oplossing** voor deze automatisering. Er is een budget van **€2.000,–** voor eventuele hardware. De klant verwacht:

1. Een **functioneel en technisch ontwerp** waarin je onderbouwt hoe je het probleem aanpakt.
2. Na goedkeuring een **high-fidelity prototype (MVP)** waarmee de klant een concreet beeld krijgt van het concept en de werking. Het prototype hoeft niet volledig af te zijn.
3. Het concept moet getest worden op **technisch niveau** én op **usability**.

### Randvoorwaarden en aandachtspunten (examenniveau)

- Je werkt aan **eigen user stories** binnen de gestelde scope; je onderbouwt keuzes richting de opdrachtgever/leidinggevende.
- Je houdt aantoonbaar rekening met **privacy, ethiek en security** (denk aan persoonsgegevens van sporters, toegangscontrole, betaal-/abonnementsgegevens).
- Je maakt een **onderbouwde keuze** voor programmeertaal, framework en ontwikkelomgeving en verantwoordt die keuze.
- Je past **versiebeheer** en **code conventions** consequent toe.
- Je bepaalt zelf een realistische afbakening van de MVP binnen de beschikbare tijd en licht die afbakening toe.

---

## Requirements als user stories

De eisen en wensen van De Kast zijn hieronder omgezet in user stories volgens het format
*Als \<rol\> wil ik \<doel\> zodat \<reden\>*, met acceptatiecriteria. Prioritering volgens **MoSCoW**.
Je werkt je **eigen** stories verder uit in taken, planning, criteria en ontwerp.

### Epic A — Toegang & abonnementen

**US-01 (Must) — Toegang op abonnementstype**
Als sporter wil ik toegang krijgen tot de sportschool op basis van mijn abonnementstype, zodat ik alleen naar binnen kan wanneer mijn abonnement dat toelaat.
*Acceptatiecriteria:*
- Bij 1×/week en 2×/week wordt het aantal bezoeken per week gecontroleerd en gehandhaafd.
- Bij "onbeperkt" is er geen bezoeklimiet.
- Bij een geweigerde toegang krijgt de sporter een begrijpelijke melding.
- Toegangspogingen worden vastgelegd (logging).

**US-02 (Must) — Abonnement annuleren**
Als sporter wil ik mijn abonnement kunnen annuleren, zodat ik niet langer betaal voor een dienst die ik niet meer gebruik.
*Acceptatiecriteria:*
- Annulering vraagt om een bevestiging.
- Na annulering vervalt de toegang volgens de geldende voorwaarden/opzegtermijn.
- De sporter ontvangt een bevestiging van de annulering.

**US-03 (Should) — Abonnementsbeheer door medewerker**
Als medewerker wil ik abonnementen kunnen inzien en beheren, zodat ik kan bijspringen zonder afhankelijk te zijn van de receptie.
*Acceptatiecriteria:*
- Medewerker kan abonnementen zoeken en de status inzien.
- Wijzigingen worden gelogd en zijn herleidbaar.

### Epic B — Cursussen

**US-04 (Must) — Cursus-addendum vereist voor inschrijving**
Als sporter wil ik alleen kunnen inschrijven voor cursussen als ik een cursus-addendum heb, zodat de toegang tot cursussen aansluit op mijn abonnement.
*Acceptatiecriteria:*
- Zonder addendum is inschrijven niet mogelijk en volgt een duidelijke melding.
- Beschikbare cursussen: yoga, pilates, paaldansen.

**US-05 (Must) — Inschrijven voor een cursus**
Als sporter wil ik mij inschrijven voor een cursus, zodat ik gegarandeerd een plek heb.
*Acceptatiecriteria:*
- De sporter ziet de beschikbare cursussen en momenten.
- Inschrijving is pas geldig na bevestiging.
- Dubbele inschrijving voor hetzelfde moment wordt voorkomen.

**US-06 (Could) — Cursusinschrijving annuleren**
Als sporter wil ik mijn cursusinschrijving kunnen annuleren, zodat mijn plek vrijkomt voor iemand anders.
*Acceptatiecriteria:*
- Annulering geeft de plek weer vrij.
- De sporter ontvangt een bevestiging.

### Epic C — Personal coaching

**US-07 (Should) — Afspraak met personal coach**
Als sporter wil ik een afspraak met een personal coach kunnen inplannen, zodat ik gerichte begeleiding krijg.
*Acceptatiecriteria:*
- De sporter ziet beschikbare momenten van coaches.
- Een gekozen moment kan niet dubbel geboekt worden.
- De sporter krijgt een bevestiging van de afspraak.

### Epic D — Kwaliteit, veiligheid & beheer (niet-functioneel)

**US-08 (Must) — Bescherming persoonsgegevens**
Als opdrachtgever wil ik dat persoonsgegevens veilig worden verwerkt, zodat De Kast voldoet aan privacywetgeving en het vertrouwen van sporters behoudt.
*Acceptatiecriteria:*
- Invoer wordt gevalideerd; gevoelige gegevens worden niet onnodig getoond of opgeslagen.
- Basale toegangscontrole scheidt sporter- en medewerkerfuncties.
- Ontwerpkeuzes rond privacy/ethiek/security zijn toegelicht.

**US-09 (Should) — Betrouwbare, onderhoudbare software**
Als developer wil ik werken volgens code conventions en versiebeheer, zodat de software leesbaar, herleidbaar en uitbreidbaar blijft.
*Acceptatiecriteria:*
- Consequent toegepaste code conventions.
- Zinvol commentaar en logische structuur.
- Gestructureerd gebruik van versiebeheer met herleidbare commits.

---

## Scope & tijd: kies één kernflow

Je hebt in totaal **12 uur** (4 u/week × 3 weken). Dat is te weinig om alle stories te bouwen. Je kiest daarom **één kernflow** als hoofd-user-story(s) en werkt die volledig uit door de drie fasen heen (ontwerpen → realiseren → testen). De doorlopende kwaliteits-stories **US-08 (privacy/security)** en **US-09 (conventions/versiebeheer)** gelden altijd — die zijn geen apart bouwwerk maar een manier van werken die je in elke fase laat zien.

### Voorgestelde selectievarianten

Kies in overleg met je begeleider **één** van onderstaande varianten (of stel met onderbouwing een eigen, even zware set samen). Elke variant is bewust klein gehouden zodat ontwerp, MVP én test binnen 12 uur haalbaar zijn.

| Variant | Kern-user-stories | Waarom haalbaar | Uitdaging / diepgang |
|---|---|---|---|
| **A — Toegangsflow** | US-01 + US-02 | Eén helder proces (toegang + annulering) met duidelijke regels per abonnementstype | Businessregels per abonnementstype, bezoeklimiet, logging |
| **B — Cursusflow** | US-04 + US-05 (+ US-06 als het lukt) | Afgebakend inschrijfproces met addendum-check | Voorwaardelijke toegang (addendum), voorkomen dubbele inschrijving |
| **C — Coachingflow** | US-07 | Kleinste functionele omvang, veel ruimte voor kwaliteit/usability | Beschikbaarheid en dubbelboeking-preventie, agenda-logica |

> **Advies:** neem niet méér dan één kernflow. Beter één flow die werkt, goed ontworpen, getest en toegelicht is (dat scoort op alle drie de werkprocessen) dan drie halve flows. Je mag US-03 of US-06 als *stretch* toevoegen als je écht tijd overhoudt.

### Realistische tijdsverdeling (12 uur)

| Week | Fase (werkproces) | Uren | Wat je oplevert |
|---|---|---|---|
| 1 | Ontwerpen (W2) | ~4 u | Functioneel + technisch ontwerp van de gekozen flow: datamodel (ERD/klassendiagram), use case diagram + wireframe(s), één activiteitendiagram (PlantUML, gerenderd), toelichting incl. privacy/security. Akkoord begeleider. |
| 2 | Realiseren (W3) | ~5 u | Werkende MVP van de gekozen flow met dummydata in een Git-repo; conventions + versiebeheer zichtbaar. |
| 3 | Testen + oplevering (W4) | ~3 u | Testplan + integratie-/acceptatietest van de flow, kort testrapport met conclusies, en de uitlegvideo. |

Deze verdeling is een richtlijn. Loop je uit in het ontwerp, versmal dan de flow (bv. alleen de "happy path") in plaats van de test over te slaan — juist het testen (W4) hoort deze sessie bij het examenbeeld.

---

## Fasering, werkprocessen en voorgestelde bewijslast

De casus wordt geëxamineerd op drie werkprocessen van kerntaak **B1-K1: Realiseert software**. Per werkproces staat hieronder het beoogde resultaat, het te tonen gedrag (uit het kwalificatiedossier) en een **voorstel van bewijslast**. De bewijslast is een voorstel: stem met je begeleider af wat in jouw context passend en haalbaar is.

### Fase 1 — Ontwerpen · Werkproces B1-K1-W2 *Ontwerpt software*

**Resultaat:** het (deel)ontwerp sluit aan op de geformuleerde eisen en wensen (de user stories).

**Te tonen gedrag:**
- Beargumenteert met steekhoudende argumenten de gemaakte keuzes in het ontwerp.
- Controleert of het ontwerp voldoet aan de gestelde eisen en wensen en doet indien nodig voorstellen om het ontwerp aan te passen.
- Volgt de geldende protocollen en regelgeving rondom privacy, ethiek en veiligheid nauwgezet op en laat dit in het ontwerp zien.

*Onderliggende competenties: Vakdeskundigheid toepassen · Op de behoeften en verwachtingen van de "klant" richten · Instructies en procedures opvolgen.*

**Voorstel van bewijslast** (voor de gekozen kernflow — zie selectievarianten). Dit sluit één op één aan
op de drie ontwerplagen en de schematechnieken die de Ontwerpcoach hanteert:

- **Functioneel ontwerp** met verwijzing naar de gekozen user stories (welke stories, welke prioriteit).
- **Gegevenslaag:** een ERD **of** klassendiagram voor de flow (eventueel genormaliseerd datamodel).
  Maak je ERD als DBML-code en render je die op [dbdiagram.io](https://dbdiagram.io/).
- **Gebruikersperspectief:** *beide* onderdelen, niet optioneel — een **use case diagram** (welke actor kan
  wat met het systeem) én **wireframe(s)/mock-up(s)** van de schermen in de flow (hoe het systeem eruitziet
  en hoe de schermen samenhangen).
- **Programmalogica:** minimaal één echt **activiteitendiagram** van het kernproces (bijv. toegang op
  abonnementstype), gemaakt in PlantUML met start/stop, minimaal één beslissing en — waar van toepassing —
  fork/join of swimlanes. **Een gewone flowchart (ook een Mermaid-flowchart) telt hier niet als geldig
  bewijs**: alleen een activiteitendiagram voldoet aan de eis voor deze laag.
- Voor elk schema dat je als code aanlevert (DBML of PlantUML) geldt: **render het** op de bijbehorende
  site (dbdiagram.io resp. [plantuml.com](https://plantuml.com/)) en controleer dat het **foutloos**
  weergeeft. Een schema dat niet rendert, is niet af.
- **Ontwerptoelichting** waarin keuzes zijn onderbouwd, inclusief een expliciete paragraaf over **privacy,
  ethiek en security**.
- **Akkoord/feedback van de leidinggevende** (opdrachtgever) op het ontwerp.

> **Werkwijze Fase 1:** gebruik de **Ontwerpcoach** (zie de studenthandleiding "Oefenen met de
> Ontwerpcoach") om je ontwerp voor de gekozen kernflow socratisch te ontwikkelen — kies daarin
> modus 2 (Oefenen) met je eigen casus en user stories, of laat modus 4 (Beoordelen) je concept-ontwerp
> vooraf becommentariëren voordat je het inlevert bij je begeleider. De coach beoordeelt op precies de
> drie criteria (Ontwerp, Schematechnieken, Onderbouwing) en dezelfde niveaus als het officiële
> beoordelingsformulier, dus geeft een betrouwbare eerste indicatie.

### Fase 2 — Realiseren · Werkproces B1-K1-W3 *Realiseert (onderdelen van) software*

**Resultaat:** de software werkt en voldoet aan de opdracht, het ontwerp en de geldende code conventions.

**Te tonen gedrag:**
- Kiest de juiste materialen en middelen (gebruikersinterface, editors, compilers, tools) en gebruikt deze effectief.
- Hanteert de code conventions volgens de voorgeschreven wijze.
- Realiseert software die netjes en goed leesbaar is.
- Realiseert de software nauwgezet conform de eisen uit opdracht en ontwerp.
- Presteert onder (tijds)druk effectief en productief.
- Werkt bij integratie van assets samen met betrokkenen en stemt een heldere taakverdeling af.

*Onderliggende competenties: Samenwerken en overleggen · Vakdeskundigheid toepassen · Kwaliteit leveren · Instructies en procedures opvolgen · Met druk en tegenslag omgaan.*

**Voorstel van bewijslast:**
- **Git-repository** van het prototype met een herleidbare commithistorie (aantoonbaar, gestructureerd versiebeheer).
- **Werkende MVP-code** met (dummy)data die de gekozen kernflow aantoont, aansluitend op het ontwerp.
- Zichtbaar toegepaste **code conventions**, zinvol commentaar en logische structuur.
- Aantoonbare aandacht voor **validatie, foutafhandeling, terugkoppeling en security** (veilig programmeren) in de code.
- **System- en userdocumentatie** (installatie/gebruik) van het prototype.

> **Let op scope:** de beoordelingsonderlegger scoort *Gerealiseerde functionaliteit* en *Kwaliteit
> opgeleverde functionaliteiten* in percentages "van de toegekende/opgeleverde functionaliteit". Voor
> deze sessie is dat **de acceptatiecriteria van je gekozen kernflow** (inclusief eventuele
> stretch-stories die je vooraf hebt afgesproken) — niet alle negen user stories uit deze leeswijzer.
> Leg dus vooraf met je begeleider vast wélke acceptatiecriteria de 100%-basis vormen.

### Fase 3 — Testen en optimaliseren · Werkproces B1-K1-W4 *Test software*

**Resultaat:** de testactiviteiten zijn correct uitgevoerd en er zijn plausibele conclusies getrokken.

**Te tonen gedrag:**
- Voert snel, correct en adequaat de testactiviteiten uit.
- Interpreteert de testresultaten en trekt logische conclusies.
- Legt testresultaten en conclusies nauwkeurig, duidelijk en conform bedrijfs- of beroepsstandaarden vast.

*Onderliggende competenties: Formuleren en rapporteren · Vakdeskundigheid toepassen · Analyseren · Instructies en procedures opvolgen.*

**Voorstel van bewijslast:**
- **Testplan** met testscenario's die aansluiten op **alle acceptatiecriteria** van de gekozen kernflow
  (hoofd- én minimaal één alternatief scenario per user story), inclusief stappen, testdata en gewenst
  resultaat.
- Uitvoering van minimaal een **integratietest** en een **acceptatietest** (usability wordt hierin meegenomen), aantoonbaar volgens het testplan.
- **Testrapport** met resultaten per scenario en onderbouwde conclusies over de samenhang en het gebruik van de applicatie.
- **Video** waarin het product wordt uitgelegd en de werking wordt getoond.

> **Let op scope:** ook hier geldt dat *Testplan*, *Testscenario* en *Testrapport* uit de
> beoordelingsonderlegger scoren in percentages "van de toegewezen functionaliteit" — dus van de
> acceptatiecriteria van je gekozen kernflow, dezelfde basis die je bij Fase 2 hebt afgesproken.

---

## Beoordeling

De beoordeling van dit project vindt plaats aan de hand van het aparte **beoordelingsformulier** (op basis van de beoordelingsonderlegger), op het niveau van de werkprocessen **B1-K1-W2, B1-K1-W3 en B1-K1-W4**. Dit document bevat bewust **geen beoordeling**; het beschrijft de casus, de user stories en de voorgestelde bewijslast waarmee je aantoont dat je aan de werkprocessen hebt gewerkt.

Voor **Fase 1 (W2 — Ontwerpen)** kun je de **Ontwerpcoach** gebruiken als voorbereidende oefening: die
coacht en beoordeelt volgens exact dezelfde drie criteria en niveaus (Ontwerp, Schematechnieken,
Onderbouwing) als het officiële beoordelingsformulier. Een indicatie van de coach vervangt de
beoordeling door je begeleider niet, maar helpt je vooraf zwakke plekken op te sporen. Voor W3 en W4
bestaat vooralsnog geen vergelijkbare coach; bespreek je voortgang daar direct met je begeleider.
