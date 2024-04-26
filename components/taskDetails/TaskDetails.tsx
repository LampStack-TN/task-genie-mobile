import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Task from "./TaskInterface";
import { ApiClient } from "../../api";

const TaskDetails: React.FC = ({ route, navigation }: any) => {
  const api = ApiClient();
  const [task, setTask] = useState<Task>({});
  const taskId = route.params.taskId;
  const fetchOne = async () => {
    try {
      const { data } = await api.get(`/task/getOne/${taskId}`);
      setTask(data);
    } catch (err) {
      console.log("fetchOne failds :", err);
    }
  };
  useEffect(() => {
    fetchOne();
  }, []);

  const handleDelete = async () => {
    try {
      await api.del(`/task/delete/${taskId}`);
      navigation.navigate("Home");
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: task.client?.avatar,
           
          }}
          style={styles.avatar}
        />
        <Text style={styles.headerText}>Urgency : {task.urgency}</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>{task.title}</Text>
        <Text style={styles.timeText}>
          {task.updatedAt ? formatDate(task.updatedAt) : ""}
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{task.location}</Text>
        <Text style={styles.priceText}>
          {task.minPrice} - {task.maxPrice}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>
      <View style={styles.skillContainer}>
        {task.skills?.map(({ id, name }) => (
          <Text style={styles.skillPill}>{name}</Text>
        ))}
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            navigation.navigate("MyTabs", { taskId: task.id });
          }}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("MyTasks");
          }}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillPill: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#6e6e6e",
    backgroundColor: "#f8f8f8",
    textAlignVertical: "center",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default TaskDetails;
