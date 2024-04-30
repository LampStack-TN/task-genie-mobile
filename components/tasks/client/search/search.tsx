import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { ApiClient } from '../../../../utils/api';
import cities from '../../../../data/cities.json'
const Search = ({ onSearchResults }:any) => {

   
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedCity, setSelectedCity] = useState('');
      
        const onFindJobsPress = async () => {
          try {
              const res = await ApiClient().get('/task/search', {
                  params: {
                      searchTitle: searchQuery,
                      searchLocation: selectedCity,
                  },
              });
              if (onSearchResults) {
                  onSearchResults(res.data);
              }
          } catch (error) {
              console.error("onFindJobsPress faileds :", error);
          }
      };
          



        return (
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <Ionicons name="search" size={20} color="#cb6e17"  />
                <TextInput
                  placeholder="Job, Title, Skill, Expertise..."
                  style={styles.input}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <View style={[styles.inputContainer, styles.secondInputContainer]}>
                <Ionicons name="location-sharp" size={20} color="#cb6e17" style={styles.icon} />
                <Picker
                  selectedValue={selectedCity}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
                >
                  <Picker.Item label="Select a city" value="" />
                  {cities.map((city) => (
                    <Picker.Item key={city.id} label={city.name} value={city.name} />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity  onPress={onFindJobsPress} style={styles.button}>  
                <Text style={styles.buttonText}>Find Jobs</Text>
              </TouchableOpacity>
            </View>
          );
};

export default Search;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffd0ad',
      padding: 15,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffe8d6',
      borderRadius: 20,
      padding: 10,
      marginBottom: 10,
    },
    secondInputContainer: {
      marginBottom: 20,
    },
    input: {
      flex: 1,
      paddingLeft: 10,
      color: '#cb6e17',
    },
    icon: {
      marginLeft: 10,
    },
    button: {
      backgroundColor: "#0C3178",
      borderRadius: 20,
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    picker: {
      flex: 1,
      color: '#cb6e17',
    },
  });
