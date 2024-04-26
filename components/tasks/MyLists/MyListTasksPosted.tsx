import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ApiClient } from "../../../api";

const MyListTasksPosted: React.FC<{
  task;
  handleDelete: (taskId: number) => void;
  navigation: any;
}> = ({ task, handleDelete, navigation }) => {
  return (
    <Pressable
      onPress={() => navigation.navigate("TaskDetails", { taskId: task.id })}
    >
      {({ pressed }) => (
        <View
          style={[styles.card, pressed ? { backgroundColor: "#f8f8f8" } : {}]}
        >
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <View style={styles.info}>
            <Icon name="place" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>{task.location}</Text>
          </View>
          <View style={styles.info}>
            <Icon name="event" size={20} color="#FF9800" />
            <Text style={styles.infoText}>{task.dueDate}</Text>
          </View>
          <View style={styles.info}>
            <Icon name="attach-money" size={20} color="#F44336" />
            <Text
              style={styles.infoText}
            >{`${task.minPrice} - ${task.maxPrice}`}</Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(task.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Text
              onPress={() => {
                navigation.navigate("MyTabs", { id: task.id });
              }}
              style={styles.buttonText}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    marginLeft: 5,
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
  buttonText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default MyListTasksPosted;
