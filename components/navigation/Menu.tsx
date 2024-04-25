import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type RootStackParamList = {
    TaskList: undefined;
    AppliedJobs: undefined;
    Tasks: undefined;
   
  };

const Menu = () => {
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyTasks')}>
        <MaterialCommunityIcons name="format-list-checkbox" size={24} color="#000" />
        <Text style={styles.buttonText}>Task List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AppliedJobs')}>
        <MaterialCommunityIcons name="briefcase-check" size={24} color="#000" />
        <Text style={styles.buttonText}>Applied Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tasks')}>
        <MaterialCommunityIcons name="map-marker-radius" size={24} color="#000" />
        <Text style={styles.buttonText}>Nearby Jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', 
        paddingTop: 20, 
        backgroundColor: '#f4f4f4',
      
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 20, 
        borderRadius: 25, 
        marginVertical: 8, 
        width: '90%', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
      },
      buttonText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
  });