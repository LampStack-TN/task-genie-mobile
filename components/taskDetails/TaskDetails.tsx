import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import Task from "./TaskInterface";
import config from "../../config";

const TaskDetails: React.FC = () => {
  const [task, setTask] = useState<Task>({});
  console.log("task : ", task);
  const fetchOne = async () => {
    try {
      const { data } = await axios.get<Task>(`${config.apiUrl}/task/getOne/2`);
      setTask(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOne();
  }, []);

  const handleDelete = async () => {
    try {
      if (task.id) {
        await axios.delete(`${config.apiUrl}/task/delete/${task.id}`);
      }
    } catch (err) {
      console.log("handleDelete failed:", err);
    }
  };

  const handleEdit = async () => {
    try {
      if (task.id) {
        const { data } = await axios.put<Task>(
          `http://localhost:3000/api/task/update/${task.id}`,
          task
        );
        setTask(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/vecteurs-libre/homme-mafieux-mysterieux-fumant-cigarette_52683-34828.jpg?w=740&t=st=1713738573~exp=1713739173~hmac=670b28133d03856472c1ac7d4c8764191d49d86c3868879b500b366391a52ec1",
          }}
          style={styles.avatar}
        />
        <Text style={styles.headerText}>Urgency : {task.urgency}</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>{task.title}</Text>
        <Text style={styles.timeText}>{task.updatedAt}</Text>
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
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
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
