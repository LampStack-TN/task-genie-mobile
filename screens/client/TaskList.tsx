import React, { useState, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Tasks } from "../../types/TaskTypes";
import { ApiClient } from "../../utils/api";
import Header from "../../components/ui/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import TaskCard from "../../components/ui/TaskCard";
import TaskActions from "../../components/client/taskList/TaskActions";

const UserTaskList = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const fetchTasks = async () => {
    try {
      const { data } = await ApiClient().get("/task/my-tasks");
      setTasks(data);
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
      <FlatList
        data={tasks}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item: task }) => (
          <TaskCard key={task.id} task={task} navigate={navigation.navigate}>
            <TaskActions
              task={task}
              navigate={navigation.navigate}
              handleDelete={handleDelete}
            />
          </TaskCard>
        )}
      />
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
