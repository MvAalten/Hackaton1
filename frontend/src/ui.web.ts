/**
 * Web-versie van meldingen/bevestigingen.
 *
 * react-native-web implementeert Alert.alert als een no-op, dus gebruiken we
 * hier de browser-eigen window.alert/window.confirm.
 */
export function toonMelding(titel: string, boodschap: string): void {
  window.alert(`${titel}\n\n${boodschap}`);
}

export function vraagBevestiging(
  titel: string,
  boodschap: string,
  _bevestigTekst: string,
  bevestigActie: () => void,
): void {
  if (window.confirm(`${titel}\n\n${boodschap}`)) {
    bevestigActie();
  }
}
