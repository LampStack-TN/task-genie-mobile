import React, { useState } from "react";
import { ScrollView, Text, StyleSheet , TouchableOpacity } from "react-native";
import TaskItem from "./TaskItem";
import { TaskProps } from "./TaskItem";
import config from "../../../config";
import { useFocusEffect } from '@react-navigation/native';
const TaskList: React.FC = ({navigation}: any) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

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
  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  return (
    
    <ScrollView>
      {tasks.map((task) => (
        <TouchableOpacity key={task.id.toString()} onPress={() => navigation.navigate('TaskDetails', { taskId: task.id })}>
          <TaskItem task={task} />
        </TouchableOpacity>
      ))}
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
