import React, { useState, useEffect } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text } from "react-native";
import { Tasks } from "../../../../types/TaskTypes";
import UserTaskCard from "./UserTaskCard";
import { ApiClient } from "../../../../utils/api";

import gradient from "../../../../assets/images/orange_gradient.png";

const UserTaskList = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await ApiClient().get("/task/myTasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await ApiClient().del(`/task/delete/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImageBackground
      source={gradient}
      resizeMode="cover"
      style={styles.container}
    >
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.title}>My Tasks,</Text>
        {tasks.map((task) => (
          <UserTaskCard
            key={task.id}
            task={task}
            navigation={navigation}
            handleDelete={handleDelete}
          />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default UserTaskList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2e2e2e",
  },
});
