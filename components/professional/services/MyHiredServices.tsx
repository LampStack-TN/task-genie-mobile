import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Service } from "../../../types/ServiceHirings";
import { ApiClient } from "../../../utils/api";
import { MaterialIcons } from "@expo/vector-icons";
import gradient from "../../../assets/images/double-gradient.png";
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
    <ImageBackground
      resizeMode="cover"
      source={gradient}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.35 }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title1}>My Services,</Text>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <Text style={styles.title}>{service.service.title}</Text>
            <View style={styles.property}>
              <MaterialIcons name="place" size={22} color="#4e4e4e" />
              <Text style={styles.propertyText}>
                {service.service.location}
              </Text>
            </View>
            <View style={styles.property}>
              <MaterialIcons name="access-time" size={22} color="#4e4e4e" />
              <Text style={styles.propertyText}>
                {service.service.availability}
              </Text>
            </View>
            <View style={styles.property}>
              <MaterialIcons name="price-change" size={22} color="#4e4e4e" />
              <Text>{service.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    overflow: "hidden",
    flex: 1,
    rowGap: 22,
    paddingTop: 28,
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#c5c5c5",
    padding: 18,
    marginBottom: 16,
    elevation: 4,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  propertyText: {
    color: "#4e4e4e",
    fontWeight: "400",
    fontSize: 18,
  },
  property: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  title1: {
    fontSize: 30,
    fontWeight: "600",
    color: "#2e2e2e",
  },
});

export default MyHiredServices;
