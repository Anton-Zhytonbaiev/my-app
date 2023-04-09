import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from "react-native";
import axios from 'axios';

const Person = ({ person, maleFunc, femaleFunc, droidFunc }) => {
  const [like, setLike] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [home, setHome] = useState({});

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

  const handleCountUpdate = (gender) => {
    if (gender === 'male') {
      if (like) {
        maleFunc(prevCount => prevCount + 1)
      } else {
        maleFunc(prevCount => prevCount - 1)
      }
    } else if (gender === 'female') {
      if (like) {
        femaleFunc(prevCount => prevCount + 1)
      } else {
        femaleFunc(prevCount => prevCount - 1)
      }
    } else if (gender === 'n/a') {
      if (like) {
        droidFunc(prevCount => prevCount + 1)
      } else {
        droidFunc(prevCount => prevCount - 1)
      }
    }
  };

  return (
    <TouchableOpacity onPress={toggleExpanded}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <TouchableOpacity 
            style={styles.square}
            onPress={() => {
              handleCountUpdate(person.gender)
              setLike(!like)
            }}
          >
            {like ? (
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