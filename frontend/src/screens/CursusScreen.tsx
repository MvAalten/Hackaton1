/**
 * Flow 2 - Cursus inschrijven.
 *
 * Toont de cursussen uit de backend en schrijft in bij een tik.
 *
 * TODO: het lid_id staat nu vast op 1. In de echte flow scan je eerst de tag
 * (zie CheckinScreen) en onthoud je welk lid is ingelogd.
 */
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Cursus, getCursussen, schrijfInVoorCursus } from '../api';

const LID_ID = 1; // TODO: vervangen door het gescande lid

export default function CursusScreen({ onTerug }: { onTerug: () => void }) {
  const [cursussen, setCursussen] = useState<Cursus[]>([]);

  useEffect(() => {
    getCursussen()
      .then(setCursussen)
      .catch(() => Alert.alert('Fout', 'Kon cursussen niet laden. Draait de backend?'));
  }, []);

  const inschrijven = async (cursus: Cursus) => {
    try {
      const uit = await schrijfInVoorCursus(LID_ID, cursus.id);
      Alert.alert(uit.ok ? 'Gelukt' : 'Niet gelukt', uit.melding);
    } catch {
      Alert.alert('Fout', 'Inschrijven mislukt.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titel}>Cursus inschrijven</Text>
      <FlatList
        data={cursussen}
        keyExtractor={(c) => String(c.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.kaart} onPress={() => inschrijven(item)}>
            <Text style={styles.kaartTitel}>{item.naam}</Text>
            {item.beschrijving ? <Text style={styles.kaartTekst}>{item.beschrijving}</Text> : null}
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
  kaartTitel: { fontSize: 20, fontWeight: '600', textTransform: 'capitalize' },
  kaartTekst: { fontSize: 14, color: '#666', marginTop: 4 },
  terug: { padding: 16, alignItems: 'center' },
  terugTekst: { color: '#6c8ebf', fontSize: 16 },
});
