import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { ApiClient } from '../../../../utils/api';
import cities from '../../../../data/cities.json'
const Search = () => {

   
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedCity, setSelectedCity] = useState('');
      
        const searchByTitle = async () => {
            try {
              await ApiClient().get('/task/search', {
                params: {
                  searchTitle: searchQuery,
                },
              });
              
            } catch (error) {
              console.error("Failed to fetch tasks by title:", error);
            }
          };

          const searchByLocation = async () => {
            try {
              await ApiClient().get('/task/search', {
                params: {
                  searchLocation: selectedCity,
                },
              });
              
            } catch (error) {
              console.error("searchByLocation faileds :", error);
            }
          };


          const onFindJobsPress = async () => {
            if (searchQuery && selectedCity) {
              try {
                await ApiClient().get('/task/search', {
                  params: {
                    searchTitle: searchQuery,
                    searchLocation: selectedCity,
                  },
                });
                
              } catch (error) {
                console.error("onFindJobsPress faileds :", error);
              }
            } else if (searchQuery) {
             
              await searchByTitle();
            } else if (selectedCity) {
             
              await searchByLocation();
            }
          };
          



        return (
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <Ionicons name="search" size={20} color="#cb6e17"  />
                <TextInput
                  placeholder="Job, Title, Skill, Expertise..."
                  
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <View style={[styles.inputContainer, styles.secondInputContainer]}>
                <Ionicons name="location-sharp" size={20} color="#cb6e17"  />
                <Picker
                  selectedValue={selectedCity}
                  
                  onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
                >
                  <Picker.Item label="Select a city" value="" />
                  {cities.map((city) => (
                    <Picker.Item key={city.id} label={city.name} value={city.name} />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity  onPress={onFindJobsPress}>
                <Text >Find Jobs</Text>
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
  }
});
