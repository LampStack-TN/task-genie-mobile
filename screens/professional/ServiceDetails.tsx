import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ApiClient } from "../../utils/api";
import { Service } from "../../types/Service";
import gradient from "../../assets/images/double-gradient.png";
import Skills from "../../data/skills.json";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const ServiceDetails = ({ route, navigation }) => {
  const skill = Skills.slice(0, 5);
  const serviceId = route.params.serviceId;
  console.log(serviceId);
  const [service, setService] = useState<Service>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const fetchOne = async () => {
    try {
      const { data } = await ApiClient().get(
        `/service/getOneService/${serviceId}`
      );
      setService(data);
    } catch (err) {
      console.log("fetchOne fails:", err);
    }
  };
  useEffect(() => {
    fetchOne();
  }, []);

  return (
    <ImageBackground
      source={gradient}
      resizeMode="cover"
      imageStyle={{ opacity: 0.5 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: service.professional?.avatar }}
          style={styles.avatar}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>{service.title}</Text>
        </View>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.property}>
          <MaterialIcons name="location-on" size={28} color="#4e4e4e" />
          <Text style={styles.propertyText}>{service.location}</Text>
        </View>
        <View style={styles.property}>
          <MaterialIcons name="calendar-month" size={28} color="#4e4e4e" />
          <Text style={styles.propertyText}>{service.availability}</Text>
        </View>
        <View style={styles.property}>
          <View style={styles.roundIcon}>
            <FontAwesome name="dollar" size={18} color="#fff" />
          </View>
          <Text style={styles.propertyText}>{service.price} TND</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>{service.description}</Text>
      </View>
      <View style={styles.skillContainer}>
        {skill.map((skill, index) => (
          <View key={index} style={styles.skillPill}>
            <Text key={index} style={styles.skillText}>
              {skill.name}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.footerContainer}>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
        <Pressable
          style={styles.editButton}
          onPress={() => {
            navigation.navigate("MyTabs", {
              taskId: service.id,
              task: service,
            });
          }}
        >
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
    borderWidth: 3,
    borderColor: "#F58D6150",
  },
  title: {
    paddingHorizontal: 10,
    flex: 1,
  },
  titleText: {
    verticalAlign: "middle",
    fontSize: 28,
    fontWeight: "600",
    color: "#0C3178",
  },
  subHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    rowGap: 10,
  },
  property: {
    flex: 1,
    flexDirection: "row",
    flexBasis: "50%",
    alignItems: "center",
    columnGap: 4,
  },
  propertyText: {
    flex: 1,
    color: "#2e2e2e",
    fontWeight: "400",
    fontSize: 18,
  },
  description: {
    marginVertical: 10,
    padding: 5,
  },
  descriptionText: {
    fontSize: 22,
    color: "#4e4e4e",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 20,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  skillPill: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#6e6e6e",
    backgroundColor: "#f8f8f8",
    verticalAlign: "middle",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 5,
  },
  skillText: {
    verticalAlign: "middle",
    textAlign: "center",
    color: "#4e4e4e",
    fontSize: 14,
  },
  editText: {
    color: "#0C3178",
    fontWeight: "bold",
  },
  deleteText: {
    fontWeight: "bold",
    color: "#0C3178",
  },
  editButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#0C3178",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#0C3178",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  roundIcon: {
    backgroundColor: "#4e4e4e",
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
});
