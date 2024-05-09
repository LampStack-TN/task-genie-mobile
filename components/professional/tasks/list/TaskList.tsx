import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import TaskItem from "./TaskItem";
import { TaskProps } from "./TaskItem";
import { useFocusEffect } from "@react-navigation/native";
import { ApiClient } from "../../../../utils/api";
const TaskList: React.FC = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const api = ApiClient();
  const fetchTasks = async () => {
    try {
      const response = await api.get('/task/getAll/');
      if (response && response.data) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );
  const handleDelete = async (taskId: number) => {
    try {
      await api.del(`/task/delete/${taskId}`);
      fetchTasks();  
    } catch (err) {
      console.log("Error deleting task:", err.message);
    }
  };

  return (
    <ScrollView>
      {tasks.map((task) => (
        <TouchableOpacity
          key={task.id}
          onPress={() =>
            navigation.navigate("TaskDetails", { taskId: task.id })
          }
        >
          <TaskItem
            task={task}
            handleDelete={handleDelete}
            navigation={navigation}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TaskList;
