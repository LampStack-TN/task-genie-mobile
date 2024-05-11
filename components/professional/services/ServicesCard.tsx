import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ApiClient } from "../../../utils/api";
const ServiceCard = ({ service, onHireSuccess, navigation }) => {
  const handleHire = async () => {
    try {
      const response = await ApiClient().post("/hiring/hiring/", {
        serviceId: service.id,
        price: service.price,
      });
      if (response.status === 201) {
        onHireSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: service.client?.avatar }} />
        <Text style={styles.title}>{service.title}</Text>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.property}>
          <MaterialIcons name="place" size={22} color="#4e4e4e" />
          <Text style={styles.propertyText}>{service.location}</Text>
        </View>
        <View style={styles.property}>
          <MaterialIcons name="access-time" size={22} color="#4e4e4e" />
          <Text style={styles.propertyText}>{service.availability}</Text>
        </View>
        <View style={styles.property}>
          <MaterialIcons name="price-change" size={22} color="#4e4e4e" />
          <Text style={styles.propertyText}>{service.price}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleHire}>
          <Text style={styles.applyButtonText}>Hire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#c5c5c5",
    marginVertical: 6,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    color: "#0c3178",
    alignSelf: "center",
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
  subHeader: {
    flexWrap: "wrap",
    rowGap: 2,
  },
  property: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  propertyText: {
    color: "#4e4e4e",
    fontWeight: "400",
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    columnGap: 4,
  },
  applyButton: {
    backgroundColor: "#0C3178",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
