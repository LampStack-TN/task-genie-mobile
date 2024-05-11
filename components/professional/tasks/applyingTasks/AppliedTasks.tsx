import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Application from "../../../../types/Application";
import { MaterialIcons } from "@expo/vector-icons";
import { ApiClient } from "../../../../utils/api";
const AppliedTasks = () => {
  const [applications, seApplication] = useState<Application[]>([]);

  useEffect(() => {
    fetchAppliedTasks();
  }, []);

  const fetchAppliedTasks = async () => {
    try {
      const response = await ApiClient().get("/task-application");
      seApplication(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      {applications.map((application) => (
        <View key={application.id} style={styles.taskCard}>
          {/* still handling ts */}
          <Text style={styles.title}>{application.task.title}</Text>
          <Text style={styles.description}> {application.task.description}</Text>

          {application.status === "Pending" ? (
            <MaterialIcons name="access-time-filled" size={24} color="black" />
          ) : application.status === "Accepted" ? (
            <MaterialIcons name="verified" size={24} color="green" />
          ) : application.status === "Rejected" ? (
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
