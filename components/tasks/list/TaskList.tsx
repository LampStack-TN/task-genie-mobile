import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import TaskItem from "./TaskItem";
import { TaskProps } from "./TaskItem";
import config from "../../../config";
import { useFocusEffect } from "@react-navigation/native";

const TaskList: React.FC = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/task/getAll/`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleDelete = async (taskId: number) => {
    try {
      await fetch(`${config.apiUrl}/task/delete/${taskId}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      {tasks.map((task) => (
        <TouchableOpacity
          key={task.id.toString()}
          onPress={() =>
            navigation.navigate("TaskDetails", { taskId: task.id })
          }
        >
          <TaskItem task={task} handleDelete={handleDelete} navigation={navigation} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default TaskList;
