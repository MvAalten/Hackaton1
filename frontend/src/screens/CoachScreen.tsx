/**
 * Flow 4 - Afspraak met personal coach.
 *
 * Toont de coaches uit de backend. Bij een tik wordt (voor nu) meteen een
 * afspraak op een vast moment gepland.
 *
 * TODO:
 *  - LID_ID vast op 1: koppel aan het gescande lid.
 *  - Laat de sporter eerst een beschikbaar moment (datum + tijd) kiezen in
 *    plaats van het vaste moment hieronder (zie flowchart 4).
 */
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Coach, getCoaches, planAfspraak } from '../api';

const LID_ID = 1; // TODO: vervangen door het gescande lid

export default function CoachScreen({ onTerug }: { onTerug: () => void }) {
  const [coaches, setCoaches] = useState<Coach[]>([]);

  useEffect(() => {
    getCoaches()
      .then(setCoaches)
      .catch(() => Alert.alert('Fout', 'Kon coaches niet laden. Draait de backend?'));
  }, []);

  const plannen = async (coach: Coach) => {
    try {
      // Vast moment als voorbeeld - vervang door een gekozen datum/tijd.
      const uit = await planAfspraak(LID_ID, coach.id, '2026-10-01', '10:00:00');
      Alert.alert(uit.ok ? 'Gelukt' : 'Niet gelukt', uit.melding);
    } catch {
      Alert.alert('Fout', 'Afspraak plannen mislukt.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titel}>Afspraak met coach</Text>
      <FlatList
        data={coaches}
        keyExtractor={(c) => String(c.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.kaart} onPress={() => plannen(item)}>
            <Text style={styles.kaartTitel}>{item.naam}</Text>
            {item.specialisatie ? <Text style={styles.kaartTekst}>{item.specialisatie}</Text> : null}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.terug} onPress={onTerug}>
        <Text style={styles.terugTekst}>Terug naar menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f5f5f5' },
  titel: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 16 },
  kaart: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 12 },
  kaartTitel: { fontSize: 20, fontWeight: '600' },
  kaartTekst: { fontSize: 14, color: '#666', marginTop: 4 },
  terug: { padding: 16, alignItems: 'center' },
  terugTekst: { color: '#6c8ebf', fontSize: 16 },
});
