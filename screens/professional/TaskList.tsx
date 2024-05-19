import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { Task } from "../../types/Task";
import { ApiClient } from "../../utils/api";
import Search from "../../components/professional/search";
import { useFocusEffect } from "@react-navigation/native";
import { getDistance } from "geolib";
import Slider from "@react-native-community/slider";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/ui/Button";
import TaskCard from "../../components/ui/TaskCard";
import TaskActions from "../../components/professional/taskList/TaskActions";

const TaskList = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [applicationModal, setApplicationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  // const [distanceFilter, setDistance] = useState(9000);
  const [SliderVisible, setSliderVisible] = useState(false);

  const user = useSelector((state: any) => state.user);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await ApiClient().get("/task/getAll");
  //       setTasks(
  //         response.data
  //           .map((task) => ({
  //             ...task,
  //             liked: task._count.favouriteTasks > 0,
  //           }))
  //           .filter((task) => {
  //             const userLocation = {
  //               latitude: task.client.latitude,
  //               longitude: task.client.longitude,
  //             };
  //             const taskLocation = {
  //               latitude: task.latitude,
  //               longitude: task.longitude,
  //             };
  //             const distance = getDistance(userLocation, taskLocation);
  //             const distanceKm = distance / 1000;
  //             // console.log(distance, "hhh");
  //             return distanceKm > 9000;
  //           })
  //       );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchTasks();
  // }, []);

  // * Good
  const fetchTasks = async () => {
    try {
      const { data } = await ApiClient().get("/task/getAll");
      setTasks(
        data.filter((task) => {
          const userLocation = {
            latitude: user.latitude,
            longitude: user.longitude,
          };
          const taskLocation = {
            latitude: task.latitude,
            longitude: task.longitude,
          };
          // console.log(taskLocation, "eee");

          const distance = getDistance(userLocation, taskLocation);
          // console.log(userLocation, "kiki");

          const distanceKm = distance / 1000;
          // console.log(distanceKm, "hhh");
          return distanceKm < 1000;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  // * Good
  const handleApplyToTask = (task: Task) => {
    setSelectedTask(task);
    setApplicationModal(true);
  };

  const handleConfirmApply = async () => {
    if (selectedTask) {
      try {
        const { data } = await ApiClient().post("/task-application/apply", {
          taskId: selectedTask.id,
          suggestedPrice: suggestedPrice.trim(),
        });
        setTasks((currentTasks) =>
          currentTasks.map((task) => {
            if (task.id === data.taskId) {
              return { ...task, applied: true, applications: [data] };
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

  const cancelApplication = async (id) => {
    try {
      const {
        data: { taskId },
      } = await ApiClient().del(`/task-application/cancel/${id}`);

      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, applied: false };
          }
          return task;
        })
      );
    } catch (error) {
      setModalMessage("Failed to cancel Application.");
      setApplicationModal(true);
    }
  };
  // * Good
  const toggleLikeTask = async (taskId) => {
    try {
      const response = await ApiClient().post("/favrourite-task/likeTask", {
        taskId,
      });
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
      <Pressable
        style={styles.buttomTop}
        onPress={() => setSliderVisible(!SliderVisible)}
      >
        <Ionicons name="options" size={32} color="#438cab" />
      </Pressable>

      {SliderVisible && (
        <>
          <Search onSearchResults={handleSearchResults} />
          {/* <Text>Distance {distanceFilter} KM</Text> */}
          {/* <Slider
            style={{ height: 50 }}
            minimumValue={0}
            maximumValue={9000}
            step={1}
            value={distanceFilter}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={setDistance}
            onSlidingComplete={fetchTasks}
          /> */}
        </>
      )}

      <FlatList
        onRefresh={handleRefresh}
        refreshing={refreshing}
        contentContainerStyle={styles.container}
        data={tasks}
        renderItem={({ item: task }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("ProDetails", { taskId: task.id })
            }
          >
            <TaskCard task={task} navigate={navigation.navigate}>
              <TaskActions
                task={task}
                onApply={() => handleApplyToTask(task)}
                onCancel={cancelApplication}
                onToggleLike={() => toggleLikeTask(task.id)}
              />
            </TaskCard>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />

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
    rowGap: 11,
    backgroundColor: "#f8f8f8",
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
  buttomTop: {
    backgroundColor: "#e6eaf1",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#c5c5c5",
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
});

export default TaskList;
