/**
 * Flow 1 - Inchecken.
 *
 * Leest een NFC-tag en stuurt die naar de backend (/toegang/checkin).
 * De backend beslist of toegang wordt verleend en geeft een melding terug.
 */
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { checkin, CheckinUit } from '../api';
import { leesTag } from '../nfc';

export default function CheckinScreen({ onTerug }: { onTerug: () => void }) {
  const [bezig, setBezig] = useState(false);
  const [resultaat, setResultaat] = useState<CheckinUit | null>(null);
  const [fout, setFout] = useState<string | null>(null);

  const scanEnCheck = async () => {
    setBezig(true);
    setFout(null);
    setResultaat(null);
    try {
      const tagUid = await leesTag(); // wacht op de tag (of mock)
      const uit = await checkin(tagUid); // vraag de backend om te beslissen
      setResultaat(uit);
    } catch (e) {
      setFout('Er ging iets mis. Draait de backend?');
    } finally {
      setBezig(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titel}>Inchecken</Text>
      <Text style={styles.uitleg}>Houd je pasje tegen de lezer.</Text>

      {bezig && <ActivityIndicator size="large" />}

      {resultaat && (
        <View style={[styles.melding, resultaat.toegestaan ? styles.ok : styles.nee]}>
          <Text style={styles.meldingTekst}>{resultaat.melding}</Text>
          {resultaat.lid_naam && <Text style={styles.naam}>{resultaat.lid_naam}</Text>}
        </View>
      )}

      {fout && <Text style={styles.fout}>{fout}</Text>}

      <TouchableOpacity style={styles.knop} onPress={scanEnCheck} disabled={bezig}>
        <Text style={styles.knopTekst}>Scan tag</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.terug} onPress={onTerug}>
        <Text style={styles.terugTekst}>Terug naar menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  titel: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  uitleg: { fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 16 },
  melding: { padding: 20, borderRadius: 12, marginVertical: 16, alignItems: 'center' },
  ok: { backgroundColor: '#d5e8d4' },
  nee: { backgroundColor: '#f8cecc' },
  meldingTekst: { fontSize: 20, fontWeight: '600' },
  naam: { fontSize: 16, marginTop: 4 },
  fout: { color: '#b85450', textAlign: 'center', marginVertical: 8 },
  knop: { backgroundColor: '#6c8ebf', padding: 20, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  knopTekst: { color: '#fff', fontSize: 18, fontWeight: '600' },
  terug: { padding: 16, alignItems: 'center' },
  terugTekst: { color: '#6c8ebf', fontSize: 16 },
});
