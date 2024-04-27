import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { Tasks } from "../../../../types/TaskTypes";
import UserTaskCard from "./UserTaskCard";
import { ApiClient } from "../../../../api";

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
    <ScrollView style={{ flex: 1 }}>
      {tasks.map((task) => (
        <UserTaskCard
          key={task.id}
          task={task}
          navigation={navigation}
          handleDelete={handleDelete}
        />
      ))}
    </ScrollView>
  );
};

export default UserTaskList;