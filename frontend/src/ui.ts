/**
 * Cross-platform meldingen/bevestigingen.
 *
 * react-native's Alert.alert werkt prima op Android, maar react-native-web
 * implementeert Alert.alert als een no-op (doet dus niets in de browser).
 * Deze module gebruikt op native gewoon Alert.alert; de .web.ts-variant
 * (zie ui.web.ts) valt terug op window.alert/window.confirm.
 */
import { Alert } from 'react-native';

/** Toon een simpele melding (OK). */
export function toonMelding(titel: string, boodschap: string): void {
  Alert.alert(titel, boodschap);
}

/** Vraag bevestiging; roept bevestigActie() alleen aan als de gebruiker akkoord gaat. */
export function vraagBevestiging(
  titel: string,
  boodschap: string,
  bevestigTekst: string,
  bevestigActie: () => void,
): void {
  Alert.alert(titel, boodschap, [
    { text: 'Nee', style: 'cancel' },
    { text: bevestigTekst, style: 'destructive', onPress: bevestigActie },
  ]);
}
