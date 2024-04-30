import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const TaskCard = ({ task, onApply }) => {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: task.client?.avatar }} />
        <Text style={styles.title}>{task.title}</Text>
      </View>
      <View style={styles.leftContainer}>
        <View style={styles.iconRow}>
          <MaterialIcons name="build" size={18} color="#666" />
          <Text style={styles.description}>{task.description}</Text>
        </View>
        <View style={styles.iconRow}>
          <MaterialIcons name="place" size={18} color="#666" />
          <Text style={styles.location}>{task.location}</Text>
        </View>
        <View style={styles.iconRow}>
          <MaterialIcons name="access-time" size={18} color="#666" />
          <Text style={styles.createdAt}>{formatDate(task.createdAt)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => onApply(task)}
      >
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
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
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    justifyContent: "flex-start",
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
    marginLeft: 8,
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
