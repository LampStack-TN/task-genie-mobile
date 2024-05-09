import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import TaskCard from "../applyingTasks/TaskCard";
import { ApiClient } from "../../../../utils/api";
import { Task } from "../../../../types/Task";
import { useFocusEffect } from "@react-navigation/native";
const FavouriteTasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [appliedTasks, setAppliedTasks] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const fetchLikedTasks = async () => {
    try {
      const response = await ApiClient().get("/favrourite-task/favoriteTasks");
      setTasks(
        response.data.map((task) => ({
          ...task,
          liked: true,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch favorite tasks:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLikedTasks();
    }, [])
  );

  const toggleLikeTask = async (taskId) => {
    try {
      const response = await ApiClient().post("/favrourite-task/likeTask", { taskId });
      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, liked: !task.liked };
          }
          return task;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplyToTask = async (appliedTask: Task) => {
    try {
      const response = await ApiClient().post("/task-application/apply", {
        taskId: appliedTask.id,
      });
      console.log(response.data);
      //remove the applied task from state
      setTasks(tasks.filter((task) => task.id !== appliedTask.id));
      // Update appliedTasks state to add the appliedtask.id
      setAppliedTasks([...appliedTasks, appliedTask.id]);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setModalMessage(error.response.data.message);
        setModalVisible(true);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleLike={() => toggleLikeTask(task.id)}
            onApply={() => handleApplyToTask(task)}
          />
        ))
      ) : (
        <Text>No favorite tasks found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavouriteTasksList;
