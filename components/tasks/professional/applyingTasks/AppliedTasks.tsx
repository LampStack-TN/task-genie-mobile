import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Task } from "../../../../types/Task";
import { MaterialIcons } from "@expo/vector-icons";
import { ApiClient } from "../../../../utils/api";
const AppliedTasks = () => {
  const [appliedTasks, setAppliedTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchAppliedTasks();
  }, []);

  const fetchAppliedTasks = async () => {
    try {
      const response = await ApiClient().get("/task/app/");
      setAppliedTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      {appliedTasks.map((applied) => (
        <View key={applied.id} style={styles.taskCard}>
          {/* still handling ts */}
          <Text style={styles.title}>{applied.task.title}</Text>
          <Text style={styles.description}> {applied.task.description}</Text>

          {applied.status === "Pending" ? (
            <MaterialIcons name="access-time-filled" size={24} color="black" />
          ) : applied.status === "Accepted" ? (
            <MaterialIcons name="verified" size={24} color="green" />
          ) : applied.status === "Rejected" ? (
            <MaterialIcons name="cancel" size={24} color="red" />
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default AppliedTasks;
