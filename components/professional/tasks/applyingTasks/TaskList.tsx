import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";
import Modal from "react-native-modal";
import TaskCard from "./TaskCard";
import { Task } from "../../../../types/Task";
import { ApiClient } from "../../../../utils/api";
import Search from "../search/search";

const TaskList = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [appliedTasks, setAppliedTasks] = useState<string[]>([]);
  const [applicationModal, setApplicationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [suggestedPrice, setSuggestedPrice] = useState("");

  // * Good
  const fetchTasks = async () => {
    try {
      const { data } = await ApiClient().get("/task/getAll");
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // * Good
  const handleApplyToTask = (task: Task) => {
    setSelectedTask(task);
    setApplicationModal(true);
  };

  const handleConfirmApply = async () => {
    if (selectedTask) {
      try {
        const { data } = await ApiClient().post("/task/apply", {
          taskId: selectedTask.id,
          suggestedPrice: suggestedPrice.trim(),
        });
        setTasks((currentTasks) =>
          currentTasks.map((task) => {
            if (task.id === data.taskId) {
              return { ...task, applied: true };
            }
            return task;
          })
        );
      } catch (error) {
        if (error.response && error.response.data.message) {
          setModalMessage(error.response.data.message);
          setApplicationModal(true);
        } else {
          console.error(error);
        }
      }
    }
    setApplicationModal(false);
    setSuggestedPrice("");
  };

  const handleRejectApply = () => {
    setSelectedTask(null);
    setApplicationModal(false);
    setSuggestedPrice("");
  };

  const handleSearchResults = (searchResults) => {
    setTasks(searchResults);
  };

  // * Good
  const toggleLikeTask = async (taskId) => {
    try {
      const response = await ApiClient().post("/task/likeTask", { taskId });
      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, liked: !task.liked };
          }
          return task;
        })
      );
    } catch (error) {
      setModalMessage("Failed to toggle like.");
      setApplicationModal(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Search onSearchResults={handleSearchResults} />
      <ScrollView style={styles.container}>
        {tasks.map((task) => (
          <Pressable
            onPress={() =>
              navigation.navigate("ProDetails", { taskId: task.id })
            }
            key={task.id}
          >
            <TaskCard
              task={task}
              onApply={() => handleApplyToTask(task)}
              onToggleLike={() => toggleLikeTask(task.id)}
            />
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={applicationModal}
      >
        <View style={styles.modalContent}>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Price</Text>
            <TextInput
              style={styles.input}
              inputMode="numeric"
              placeholder="Suggess a price?"
              value={suggestedPrice}
              onChangeText={setSuggestedPrice}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 8,
              paddingHorizontal: 8,
            }}
          >
            <Pressable style={styles.cancelButton} onPress={handleRejectApply}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={handleConfirmApply}>
              <Text style={styles.modalButtonText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal isVisible={modalMessage !== ""}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 16, marginBottom: 12, textAlign: "center" }}>
            {modalMessage}
          </Text>
          <Pressable onPress={() => setModalMessage("")}>
            <Text style={{ fontSize: 16, color: "blue", textAlign: "center" }}>
              Close
            </Text>
          </Pressable>
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
    borderRadius: 12,
    gap: 12,
    borderColor: "#00000019",
  },
  modalButton: {
    backgroundColor: "#E64F0F",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButtonText: {
    color: "#4e4e4e",
    fontWeight: "bold",
    textAlign: "center",
  },
  inputView: {
    backgroundColor: "#fff",
    height: 60,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    fontSize: 14,
    justifyContent: "center",
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    position: "absolute",
    top: -10,
    left: 22,
    color: "#F58D61",
    backgroundColor: "#fff",
    paddingLeft: 5,
    paddingRight: 8,
  },
  input: {
    fontSize: 14,
  },
});
export default TaskList;
