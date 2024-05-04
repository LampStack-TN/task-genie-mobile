import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TaskCard = ({ task, onApply, onToggleLike }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: task.client?.avatar }} />
        <Text style={styles.title}>{task.title}</Text>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.properties}>
          <View style={styles.property}>
            <MaterialIcons name="place" size={22} color="#4e4e4e" />
            <Text style={styles.propertyText}>{task.location}</Text>
          </View>
          <View style={styles.property}>
            <MaterialIcons name="timelapse" size={22} color="#4e4e4e" />
            <Text style={styles.propertyText}>Urgency: {task.urgency}</Text>
          </View>
          <View style={styles.property}>
            <MaterialIcons name="access-time" size={22} color="#4e4e4e" />
            <Text style={styles.propertyText}>{task.dueDate}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.applyButton,
              task.applied && { backgroundColor: "#c5c5c5" },
            ]}
            onPress={() => onApply(task)}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onToggleLike()}>
            <MaterialIcons
              name={task.liked ? "favorite" : "favorite-outline"}
              size={40}
              color="#F58D61"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    flexDirection: "row",
    marginBottom: 12,
  },
  properties: {
    flexWrap: "wrap",
    rowGap: 2,
    flex: 1,
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
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    columnGap: 4,
  },
  applyButton: {
    backgroundColor: "#0C3178",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TaskCard;
