import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Service } from "../../types/Service";
import { ApiClient } from "../../utils/api";

import gradient from "../../assets/images/orange_gradient.png";

const MyServices = ({ navigation }) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ApiClient().get("/service/getMyServices");
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  return (
    <ImageBackground
      source={gradient}
      imageStyle={{ opacity: 0.6 }}
      resizeMode="cover"
      style={styles.container}
    >
      <View>
        {/* <Text style={styles.title1}>My Services,</Text> */}
        {services.map((service) => (
          <Pressable
            key={service.id}
            onPress={() =>
              navigation.navigate("ServiceDetails", { serviceId: service.id })
            }
          >
            <View style={styles.card}>
            {/* <Image style={styles.avatar} source={{ uri: service.client?.avatar }} /> */}
              <Text style={styles.title}>{service.title}</Text>
              <View style={styles.infoSection}>
                <View style={{ flexDirection: "row" }}>
                  <View style={[styles.info, { flex: 1 }]}>
                    <Icon name="place" size={20} color="#4CAF50" />
                    <Text style={styles.infoText}>{service.location}</Text>
                  </View>
                  <View style={[styles.info, { flex: 1 }]}>
                    <Icon name="attach-money" size={20} color="#F44336" />
                    <Text>{service.price}</Text>
                  </View>
                </View>
                <View style={styles.info}>
                  <Icon name="event" size={20} color="#FF9800" />
                  <Text style={styles.infoText}>{service.availability}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ImageBackground>
  );
};
export default MyServices;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 28,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#bfbfbf",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 20,
    color: "#0C3178",
    fontWeight: "600",
    marginBottom: 5,
  },
  infoSection: {
    // flexWrap: "wrap",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 5,
  },
  title1: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2e2e2e",
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
});
