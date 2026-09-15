/**
 * Flow 3 - Abonnement opzeggen.
 *
 * Vraagt eerst om bevestiging (US-02) en stuurt de opzegging naar de backend.
 *
 * TODO: LID_ID staat vast op 2; koppel dit aan het gescande lid.
 */
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { zegAbonnementOp } from '../api';

const LID_ID = 2; // TODO: vervangen door het gescande lid

export default function OpzeggenScreen({ onTerug }: { onTerug: () => void }) {
  const [melding, setMelding] = useState<string | null>(null);

  const opzeggen = () => {
    // Bevestiging vragen vóór het daadwerkelijk opzeggen.
    Alert.alert('Weet je het zeker?', 'Wil je je abonnement echt opzeggen?', [
      { text: 'Nee', style: 'cancel' },
      {
        text: 'Ja, opzeggen',
        style: 'destructive',
        onPress: async () => {
          try {
            const uit = await zegAbonnementOp(LID_ID, true);
            setMelding(uit.melding);
          } catch {
            setMelding('Opzeggen mislukt. Draait de backend?');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titel}>Abonnement opzeggen</Text>
      {melding && <Text style={styles.melding}>{melding}</Text>}
      <TouchableOpacity style={styles.knop} onPress={opzeggen}>
        <Text style={styles.knopTekst}>Opzeggen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.terug} onPress={onTerug}>
        <Text style={styles.terugTekst}>Terug naar menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  titel: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  melding: { fontSize: 16, textAlign: 'center', marginBottom: 24, color: '#333' },
  knop: { backgroundColor: '#b85450', padding: 20, borderRadius: 12, alignItems: 'center' },
  knopTekst: { color: '#fff', fontSize: 18, fontWeight: '600' },
  terug: { padding: 16, alignItems: 'center', marginTop: 8 },
  terugTekst: { color: '#6c8ebf', fontSize: 16 },
});
