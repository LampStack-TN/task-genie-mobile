import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Task from "./TaskInterface";
import config from "../../config";
import { ApiClient } from "../../api";
import { TaskProps } from "../tasks/list/TaskItem";
import { useSelector } from "react-redux";

const TaskDetails: React.FC = ({ route, navigation }: any) => {

  const api = ApiClient()
  const task = useSelector((state: any) => state.task);
  // console.log(task,'hhh');

  // console.log();
  const [taskss, setTask] = useState<Task>({});
  const [taskDetail, setTaskDetail] = useState<Task>({});
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const taskId = route.params.taskId;
  console.log("task : ", taskId);
  const fetchOne = async () => {
    try {
      const { data } = await api.get(`/task/getOne/${taskId}`);
      setTaskDetail(data);
    } catch (err) {
      console.log('fetchOne failds :',err);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/task/getAll');
      setTasks(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchOne();
    fetchTasks();
  }, [taskId]);

  const handleDelete = async () => {
    try {
      await api.del(`/task/delete/${taskId}`);
      fetchTasks();
      navigation.navigate("TaskList");
    } catch (err) {
      console.log("Handle delete failed:", err.message);
    }
  };
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // if you want 12 hour time format with AM/PM
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <ImageBackground
      source={{
        uri: "https://static.vecteezy.com/system/resources/previews/013/107/410/large_2x/color-gradation-background-horizontal-layout-soft-pastel-effect-backdrop-design-dramatic-saturation-trendy-futuristic-style-color-blending-pink-white-yellow-gradient-mesh-abstract-art-vector.jpg",
      }}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Image
              source={{
                uri: taskss.client?.avatar,
              }}
              style={styles.avatar}
            />
            <Text style={styles.headerText}>Urgency : {taskss.urgency}</Text>
          </View>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>{taskss.title}</Text>
            <Text style={styles.timeText}>
              {taskss.updatedAt ? formatDate(taskss.updatedAt) : ""}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{taskss.location}</Text>
            <Text style={styles.priceText}>
              {taskss.minPrice} - {taskss.maxPrice}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{taskss.description}</Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              navigation.navigate("MyTabs", { taskId: taskss.id });
            }}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.navigate("MyBottomTab");
            }}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fffda5", // Darker color
    opacity: 0.5, // Adjust as necessary
    borderRadius: 12,
  },
  container: {
    borderRadius: 12,
    padding: 20,
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  editText: {
    color: "#0C3178",
    fontWeight: "bold",
  },
  deleteText: {
    fontWeight: "bold",
    color: "#0C3178",
  },
  editButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#0C3178",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#0C3178",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    color: "#0C3178",
    fontWeight: "bold",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  subHeaderText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  timeText: {
    fontSize: 14,
    color: "#828282",
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4F4F4F",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EB5757",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: "#4F4F4F",
    lineHeight: 20,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns the buttons to the right
    alignItems: "center",
    flex: 1,
  },
  footerButton: {
    marginLeft: 10, // This adds spacing between the buttons
  },
  footerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4F4F4F",
  },
});

export default TaskDetails;
