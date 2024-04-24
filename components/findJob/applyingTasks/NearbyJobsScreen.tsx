// NearbyJobsScreen.tsx
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import axios from "axios";
import TaskCard from "./TaskCard";
import { Task } from "./types";

const NearbyJobsScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/task/getAll"
        );
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleApplyToTask = async (appliedTask: Task) => {
    console.log(appliedTask);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/task/apply",
        { userId: 10015, taskId: appliedTask.id, price: appliedTask.price }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onApply={handleApplyToTask}
          // userId={userId}
        />
      ))}
    </ScrollView>
  );
};

export default NearbyJobsScreen;
