import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Service } from '../../../types/ServiceHirings'; 
import { ApiClient } from '../../../utils/api';
const MyHiredServices = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchHiredServices();
  }, []);

  const fetchHiredServices = async () => {
    try {
      const response = await ApiClient().get("/hiring/myhirings");
      setServices(response.data);
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <ScrollView style={styles.container}>
      {services.map((service) => (
        <View key={service.id} style={styles.serviceCard}>
          <Text style={styles.title}>{service.service.title}</Text>
          <Text style={styles.description}>{service.service.description}</Text>
          <Text>{service.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default MyHiredServices;
