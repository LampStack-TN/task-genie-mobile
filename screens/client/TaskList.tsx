import React, { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Tasks } from "../../types/TaskTypes";
import UserTaskCard from "../../components/client/TaskCard";
import { ApiClient } from "../../utils/api";
import Header from "../../components/ui/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const UserTaskList = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const fetchTasks = async () => {
    try {
      const { data } = await ApiClient().get("/task/my-tasks");
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleDelete = async (taskId) => {
    try {
      await ApiClient().del(`/task/delete/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="My Tasks List">
        <MaterialIcons name="task-alt" size={32} color="#93543a" />
      </Header>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {tasks.map((task, i) => (
          <UserTaskCard
            key={task.id + i + ""}
            task={task}
            navigation={navigation}
            handleDelete={handleDelete}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default UserTaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    // overflow: "hidden",
    flexGrow: 1,
    backgroundColor: "#fff",
  },
});
