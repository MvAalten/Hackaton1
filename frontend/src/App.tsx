/**
 * Hoofdscherm van de kiosk.
 *
 * Simpele schermwisseling met useState (bewust geen navigatiebibliotheek, zodat
 * de basis klein blijft). Wil je meerdere lagen navigatie? Voeg dan
 * @react-navigation toe.
 */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { initNfc } from './nfc';
import CheckinScreen from './screens/CheckinScreen';
import CoachScreen from './screens/CoachScreen';
import CursusScreen from './screens/CursusScreen';
import OpzeggenScreen from './screens/OpzeggenScreen';

// De schermen die de kiosk kent (komen overeen met de vier flows).
export type Scherm = 'home' | 'checkin' | 'cursus' | 'opzeggen' | 'coach';

const MENU: { scherm: Scherm; label: string }[] = [
  { scherm: 'checkin', label: 'Inchecken' },
  { scherm: 'cursus', label: 'Cursus inschrijven' },
  { scherm: 'opzeggen', label: 'Abonnement opzeggen' },
  { scherm: 'coach', label: 'Afspraak met coach' },
];

export default function App() {
  const [scherm, setScherm] = useState<Scherm>('home');

  // NFC-module één keer starten bij het opstarten.
  useEffect(() => {
    initNfc().catch((e) => console.warn('NFC init mislukt:', e));
  }, []);

  const terug = () => setScherm('home');

  if (scherm === 'checkin') return <CheckinScreen onTerug={terug} />;
  if (scherm === 'cursus') return <CursusScreen onTerug={terug} />;
  if (scherm === 'opzeggen') return <OpzeggenScreen onTerug={terug} />;
  if (scherm === 'coach') return <CoachScreen onTerug={terug} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titel}>Sportschool De Kast</Text>
      <Text style={styles.subtitel}>Kies een optie</Text>
      <View style={styles.menu}>
        {MENU.map((item) => (
          <TouchableOpacity
            key={item.scherm}
            style={styles.knop}
            onPress={() => setScherm(item.scherm)}>
            <Text style={styles.knopTekst}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f5f5f5' },
  titel: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 24 },
  subtitel: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 32 },
  menu: { gap: 16 },
  knop: {
    backgroundColor: '#6c8ebf',
    paddingVertical: 22,
    borderRadius: 12,
    alignItems: 'center',
  },
  knopTekst: { color: '#fff', fontSize: 20, fontWeight: '600' },
});
