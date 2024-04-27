import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Task } from '../../../../types/Task'; 

const TaskCard = ({ task, onApply }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.iconRow}>
          <MaterialIcons name="build" size={18} color="#666" />
          <Text style={styles.description}>{task.description}</Text>
        </View>
        <View style={styles.iconRow}>
          <MaterialIcons name="place" size={18} color="#666" />
          <Text style={styles.location}>{task.location}</Text>
        </View>
        <View>
          <MaterialIcons name="access-time" size={24} color="black" />
          <Text style={styles.createdAt}>{task.createdAt}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.applyButton} onPress={() => onApply(task)}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 0.3,
  },
  bottomRightContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginLeft: 8,
  },
  location: {
    fontSize: 14,
    marginLeft: 8,
  },
  createdAt: {
    fontSize: 12,
    color: "#666",
  },
  avatar: {
    marginBottom: 20,
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

export default TaskCard;
