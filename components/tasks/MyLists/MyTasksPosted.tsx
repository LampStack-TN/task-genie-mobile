import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Tasks } from "./TaskTypes";
import MyListTasksPosted from "./MyListTasksPosted";
import { ApiClient } from "../../../api";
import { useFocusEffect } from "@react-navigation/native";

const MyTasksPosted = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);


    const fetchTasks = async () => {
      try {
        const response = await ApiClient().get("/task/myTasks");
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };



  useFocusEffect(
    React.useCallback(() => {
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
    <ScrollView style={{ flex: 1 }}>
      {tasks.map((task) => (
        <MyListTasksPosted
          key={task.id}
          task={task}
          navigation={navigation}

          handleDelete={handleDelete}
        />
      ))}
    </ScrollView>
  );
};

export default MyTasksPosted;
