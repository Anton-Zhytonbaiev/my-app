import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Counters = ({ femaleCount, maleCount, droidCount }) => {
  return (
    <View style={styles.countersContainer}>
      <View style={styles.sectionCounter}>
        <Text style={styles.counter}>{femaleCount}</Text>
        <Text style={styles.counterName}>Female Fans</Text>
      </View>
      <View style={styles.sectionCounter}>
        <Text style={styles.counter}>{maleCount}</Text>
        <Text style={styles.counterName}>Male Fans</Text>
      </View>
      <View style={styles.sectionCounter}>
        <Text style={styles.counter}>{droidCount}</Text>
        <Text style={styles.counterName}>Others</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countersContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sectionCounter: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
  },
  counter: {
    fontSize: 24,
  },
  counterName: {
    fontSize: 18,
  },
});

export default Counters;