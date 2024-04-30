import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import ServiceCard from "./ServicesCard";
import { ApiClient } from "../../../utils/api";
import { Service } from "../../../types/Service";

const ServicesList = ({ navigation }) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ApiClient().get("/service/getAllServices");
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {services.map((service) => (
          <Pressable key={service.id} >
            <ServiceCard service={service} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default ServicesList;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    overflow: "hidden",
    flex: 1,
    rowGap: 22,
    backgroundColor: "#fff",
  },
});
