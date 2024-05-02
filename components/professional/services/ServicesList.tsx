import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
} from "react-native";
import ServiceCard from "./ServicesCard";
import { ApiClient } from "../../../utils/api";
import { Service } from "../../../types/Service";
import gradient from "../../../assets/images/double-gradient.png";

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
    <ImageBackground
      resizeMode="cover"
      source={gradient}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.45 }}
    >
      <ScrollView style={styles.container}>
        {services.map((service) => (
          <Pressable key={service.id}>
            <ServiceCard service={service} />
          </Pressable>
        ))}
      </ScrollView>
    </ImageBackground>
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
  },
});
