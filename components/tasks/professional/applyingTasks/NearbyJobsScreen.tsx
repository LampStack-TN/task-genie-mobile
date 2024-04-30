import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import TaskCard from "./TaskCard";
import { Task } from "../../../../types/Task";
import { ApiClient } from "../../../../utils/api";
import Search from "../../client/search/search";

const NearbyJobsScreen = ({navigation}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [appliedTasks, setAppliedTasks] = useState<string[]>([]);
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
      const response = await ApiClient().post("/task/apply", {
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

  const filteredTasks = tasks.filter((task) => !appliedTasks.includes(task.id));

  const handleSearchResults = (searchResults) => {
    setTasks(searchResults);
  };

  return (
    <View style={{ flex: 1 }}>
      <Search onSearchResults={handleSearchResults} />
      <ScrollView style={styles.container}>
        {filteredTasks.map((task) => (
          <TouchableOpacity
          key={task.id.toString()}
            onPress={() =>
              navigation.navigate("ProDetails", { taskId: task.id })
            }>
          <TaskCard
            key={task.id}
            task={task}
            onApply={() => handleApplyToTask(task)}
          />
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    overflow: "hidden",
    flex: 1,
    rowGap: 22,
    backgroundColor: "#fff",
  },
});
