// NearbyJobsScreen.tsx
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import axios from "axios";
import TaskCard from "./TaskCard";
import { Task } from "./types";
import { ApiClient } from "../../../api";

const NearbyJobsScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await ApiClient().get("/task/getAll");
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleApplyToTask = async (appliedTask: Task) => {
    try {
      // Notice how we're not sending a userId here
      const response = await ApiClient().post("/task/apply", {
        taskId: appliedTask.id,
      });
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
          onApply={() => handleApplyToTask(task)}          
        />
      ))}
    </ScrollView>
  );
};

export default NearbyJobsScreen;
