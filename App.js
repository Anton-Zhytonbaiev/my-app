import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import Character from './components/Character';
import Counters from './components/Counters';
import axios from 'axios';


export default function App() {
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorite, setFavorite] = useState([]);

  const femaleCount = favorite.filter(el => el.gender === 'female').length;
  const maleCount = favorite.filter(el => el.gender === 'male').length;
  const droidCount = favorite.filter(el => el.gender === 'n/a').length;

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then(response => {
        setPeople(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  return ( 
    <ScrollView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.tasksTitle}>Fans</Text>
        <Counters 
          femaleCount={femaleCount}
          maleCount={maleCount}
          droidCount={droidCount}
        />
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => {
            setFavorite([]);
          }}
        >
          <Text style={styles.resetText}>Clear Fans</Text>
        </TouchableOpacity>


        <View style={styles.items}>
          {people.map(person => (
            <Character
              key={person.created} 
              person={person}
              favorite={favorite}
              setFavorite={setFavorite}
            />
          ))}
        </View>
        <View style={styles.buttonConteiner}>
          <Button 
            title="Prev"
            disabled={currentPage === 1} 
            onPress={handlePrevPage} 
          />
          <Button 
            title="Next"
            disabled={currentPage === 9}
            onPress={handleNextPage}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6ec',
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  tasksTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  countersWeapper: {
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
  resetButton: {
    marginTop: 15,
    height: 35,
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: {
    color: 'red',
    fontSize: 18,
  },
  items: {
    marginTop: 15,
  },
  buttonConteiner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
