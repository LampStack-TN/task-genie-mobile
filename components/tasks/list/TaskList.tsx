import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import { TaskProps } from "./TaskItem";
import config from "../../../config";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/task/getAll/`);
        const data = await response.json();
        setTasks(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <ScrollView style={containerStyles.container}>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id.toString()} task={task} />)
      ) : (
        <Text>No tasks available.</Text>
      )}
    </ScrollView>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1,
  },
});

export default TaskList;
