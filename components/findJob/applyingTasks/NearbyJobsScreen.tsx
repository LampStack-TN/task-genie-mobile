// NearbyJobsScreen.tsx
import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import TaskCard from "./TaskCard";
import { Task } from "./types";
import { ApiClient } from "../../../api";

const NearbyJobsScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      // Notice how we're not sending a userId here//
      const response = await ApiClient().post("/task/apply", {
        taskId: appliedTask.id,
      });
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
    <View style={{ flex: 1 }}>
      <ScrollView>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onApply={() => handleApplyToTask(task)}
          />
        ))}
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: "white",
            padding: 22,
            borderRadius: 4,
            borderColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 12 }}>{modalMessage}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ fontSize: 16, color: "blue", textAlign: "center" }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default NearbyJobsScreen;
