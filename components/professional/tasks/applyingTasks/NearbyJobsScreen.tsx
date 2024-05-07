import React, { useState, useEffect } from "react";
import {
  Pressable,
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
import Search from "../search/search";
//
import Slider from "@react-native-community/slider";
import { getDistance } from "geolib";

const NearbyJobsScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [appliedTasks, setAppliedTasks] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(10);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await ApiClient().get("/task/getAll");
        setTasks(
          response.data
            .map((task) => ({
              ...task,
              liked: task._count.favouriteTasks > 0,
            }))
            .filter((task) => {
              const userLocation = {
                latitude: task.client.latitude,
                longitude: task.client.longitude,
              };
              const taskLocation = {
                latitude: task.latitude,
                longitude: task.longitude,
              };
              const distance = getDistance(userLocation, taskLocation);
              const distanceKm = distance / 1000;
              // console.log(distance, "hhh");
              return distanceKm > 9000;
            })
        );
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
      setModalVisible(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Search onSearchResults={handleSearchResults} />
    
        {/* <Text>Distance Filter: {distanceFilter} KM</Text> */}
        {/* <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={distanceFilter}
          onValueChange={(value) => setDistanceFilter(value)}
         
        />  */}
      
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
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 16, marginBottom: 12, textAlign: "center" }}>
            Do you want to apply for this task?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Suggested Price"
            value={suggestedPrice}
            onChangeText={setSuggestedPrice}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleConfirmApply}
            >
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleRejectApply}
            >
              <Text style={styles.modalButtonText}>No</Text>
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
  modalButton: {
    backgroundColor: "#335ba7",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    width: "45%",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
export default NearbyJobsScreen;
