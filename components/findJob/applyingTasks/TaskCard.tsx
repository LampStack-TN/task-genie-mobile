import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, } from 'react-native';
import axios from 'axios';

type Task = {
  id: string;
  title: string;
  description: string;
  location: string;
  urgency: string;
  createdAt: string; 
};

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  

  return (
    <View style={styles.card}>
    <Text style={styles.title}>{task.title}</Text>
    <Text style={styles.description}>{task.description}</Text>
   
  </View>
  
  );
};
const styles = StyleSheet.create({

    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      marginHorizontal: 20,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
   
  });

export default TaskCard