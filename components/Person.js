import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from "react-native";
import axios from 'axios';

const Person = ({ person, favorite, setFavorite }) => {
  const [expanded, setExpanded] = useState(false);
  const [home, setHome] = useState({});

  const conditionButton = !favorite.includes(person);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  }

  useEffect(() => {
    axios.get(`${person.homeworld}`)
      .then(response => {
        setHome(response.data.name);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleFavorite = (one) => {
    if (!favorite.includes(one)) {
      setFavorite([...favorite, one])
    }

    if (favorite.includes(one)) {
      setFavorite(favorite.filter(el => el.name !== one.name))
    }
  }

  // console.log(favorite)

  return (
    <TouchableOpacity onPress={toggleExpanded}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <TouchableOpacity 
            style={styles.square}
            onPress={() => {
              handleFavorite(person)
            }}
          >
            {conditionButton ? (
              <ImageBackground
                style={{width: '100%', height: '100%'}}
                source={require('../assets/empty.png')}
              >
              </ImageBackground>
            ) : (
              <ImageBackground
                style={{width: '100%', height: '100%'}}
                source={require('../assets/full.png')}
              >
              </ImageBackground>
            )}
          </TouchableOpacity>
          <Text style={styles.itemText}>{person.name}</Text>
        </View>
        {expanded && (
          <View style={styles.addInform}>
            <Text>Birth Year - {person.birth_year}</Text>
            <Text>Gender - {person.gender}</Text>
            <Text>Home World - {home}</Text>
          </View>
        )}
      </View> 
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  addInform: {
    flexDirection: 'column',
  },
});

export default Person;