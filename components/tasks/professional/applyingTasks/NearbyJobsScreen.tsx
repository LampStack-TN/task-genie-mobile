import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import TaskCard from "./TaskCard";
import { Task } from "../../../../types/Task";
import { ApiClient } from "../../../../utils/api";
import Search from "../../client/search/search";
const NearbyJobsScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [appliedTasks, setAppliedTasks] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [suggestedPrice, setSuggestedPrice] = useState("");
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
  const handleApplyToTask = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };
  const handleConfirmApply = async () => {
    if (selectedTask) {
      try {
        const response = await ApiClient().post("/task/apply", {
          taskId: selectedTask.id,
          suggestedPrice: suggestedPrice.trim(),
        });
        console.log(response.data);
        //remove the applied task from state
        setTasks(tasks.filter((task) => task.id !== selectedTask.id));
        // Update appliedTasks state to add the appliedtask.id
        setAppliedTasks([...appliedTasks, selectedTask.id]);
      } catch (error) {
        if (error.response && error.response.data.message) {
          setModalMessage(error.response.data.message);
          setModalVisible(true);
        } else {
          console.error(error);
        }
      }
    }
    setModalVisible(false);
    setSuggestedPrice("");
  };
  const handleRejectApply = () => {
    setSelectedTask(null);
    setModalVisible(false);
    setSuggestedPrice("");
  };
  const handleSearchResults = (searchResults) => {
    setTasks(searchResults);
  };
  return (
    <View style={{ flex: 1 }}>
      <Search onSearchResults={handleSearchResults} />
      <ScrollView style={styles.container}>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id.toString()}
            onPress={() =>
              navigation.navigate("ProDetails", { taskId: task.id })
            }
          >
            <TaskCard
              key={task.id}
              task={task}
              onApply={() => handleApplyToTask(task)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 16, marginBottom: 12, textAlign: "center" }}>
            Do you want to apply for this task?
          </Text>
          <TextInput
            placeholder="Suggested Price"
            value={suggestedPrice}
            onChangeText={setSuggestedPrice}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity onPress={handleConfirmApply}>
              <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRejectApply}>
              <Text>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={modalMessage !== ""}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 16, marginBottom: 12, textAlign: "center" }}>
            {modalMessage}
          </Text>
          <TouchableOpacity onPress={() => setModalMessage("")}>
            <Text style={{ fontSize: 16, color: "blue", textAlign: "center" }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    overflow: "hidden",
    flex: 1,
    rowGap: 22,
    backgroundColor: "#fff",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 4,
    borderColor: "#00000019",
  },
});
export default NearbyJobsScreen;
