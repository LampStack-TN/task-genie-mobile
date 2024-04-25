import React, { useState, useEffect } from "react";
import { ScrollView, View, Text,StyleSheet } from "react-native";
import axios from "axios";
import { Task } from "./types";
import { MaterialIcons } from '@expo/vector-icons';
const AppliedTasks = () => {
  const [appliedTasks, setAppliedTasks] = useState<Task[]>([]);


  useEffect(() => {
    fetchAppliedTasks();
  }, []);

  const fetchAppliedTasks = async () => {
    try {
      const userId = 10015;
      const response = await axios.get(
        `http://localhost:3000/api/task/app/${userId}`
      );
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
          <MaterialIcons name="pending" size={24} color="black" />
          <MaterialIcons name="verified" size={24} color="green" />        </View>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
  }
});

export default AppliedTasks;