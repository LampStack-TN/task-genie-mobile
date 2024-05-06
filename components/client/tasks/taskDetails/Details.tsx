import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Details = ({ setModalVisible, task, navigation, children }) => {
  return (
    <View style={styles.taskDetails}>
      <View style={styles.header}>
        <Image source={{ uri: task.client?.avatar }} style={styles.avatar} />
        <View style={styles.title}>
          <Text style={styles.titleText}>{task.title}</Text>
          <Text style={styles.clientName}>{task.client?.fullName}.</Text>
        </View>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.property}>
          <MaterialIcons name="location-on" size={28} color="#0c4167" />
          <Text style={styles.propertyText}>{task.location}</Text>
        </View>
        <View style={styles.property}>
          <MaterialIcons name="calendar-month" size={28} color="#0c4167" />
          <Text style={styles.propertyText}>{task.dueDate}</Text>
        </View>
        <View style={styles.property}>
          <MaterialCommunityIcons name="clock" size={28} color="#0c4167" />
          <Text style={styles.propertyText}>Urgency: {task.urgency}</Text>
        </View>
        <View style={styles.property}>
          <View style={styles.roundIcon}>
            <FontAwesome name="dollar" size={16} color="#fff" />
          </View>
          <Text style={styles.propertyText}>
            {task.minPrice} - {task.maxPrice} TND
          </Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>
      <View style={styles.skillContainer}>
        {task.skills?.map((skill, index) => (
          <View key={index} style={styles.skillPill}>
            <Text key={index} style={styles.skillText}>
              {skill.name}
            </Text>
          </View>
        ))}
      </View>
      {children}
      <View style={styles.footerContainer}>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
        <Pressable
          style={styles.editButton}
          onPress={() => {
            navigation.navigate("MyTabs", { taskId: task.id, task: task });
          }}
        >
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
        {/* <Pressable
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("MyTasks");
          }}
        >
          <Text style={styles.backText}>Back</Text>
        </Pressable> */}
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  taskDetails: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFFC0",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#c5c5c5",
    marginVertical: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    padding: 5,
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
  clientName: {
    verticalAlign: "middle",
    fontSize: 18,
    fontWeight: "400",
    color: "#4e4e4e",
  },
  subHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    rowGap: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
  property: {
    flex: 1,
    flexDirection: "row",
    flexBasis: "50%",
    alignItems: "center",
    columnGap: 8,
  },
  propertyText: {
    flex: 1,
    color: "#4e4e4e",
    fontWeight: "500",
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
  backText: {
    color: "#0C3178",
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 20,
  },
  roundIcon: {
    backgroundColor: "#0c4167",
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
});
