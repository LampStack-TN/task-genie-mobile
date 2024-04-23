import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export type TaskProps = {
  id?: number;
  client?: string;
  urgency?: string;
  title?: string;
  updatedAt?: string;
  category?: string;
  postedTime?: string;
  applicants?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;

  description?: string;
  handleDelete?: (taskId: number) => void;
  //   urgency?: 'Urgent' | 'Soon' | 'Low';
};

const TaskItem: React.FC<{task: TaskProps;handleDelete: (taskId: number) => void;}> = ({ task, handleDelete }) => {
  if (!task) {
    return null;
  }

  //   const urgencyColor = task.urgency === 'Urgent' ? '#FF4136' : task.urgency === 'Soon' ? '#FF851B' : '#AAAAAA';
  //   const urgencyText = task.urgency ? task.urgency : 'Low'; // Default to 'Low' if not specified
  //work in the urgency color depend the urgency of time
  return (
    <View style={styles.taskCard}>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.categoryRow}>
        <MaterialIcons name="build" size={24} color="black" />
        <Text style={styles.categoryText}>{task.category}</Text>
        <MaterialIcons name="location-on" size={24} color="black" />
        <Text style={styles.locationText}>{task.location}</Text>
      </View>
      <View style={styles.urgencyRow}>
        <MaterialIcons name="schedule" size={24} color="black" />
        {/* <Text style={[styles.urgencyText, { color: urgencyColor }]}>{urgencyText}</Text> */}
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.timeText}>{task.postedTime}</Text>
        <View style={styles.applicantCount}>
          <Text style={styles.applicantText}>
            {task.applicants} People Applied
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => task.id && handleDelete(task.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 10,
  },
  urgencyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  urgencyText: {
    fontSize: 16,
    marginLeft: 10,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: "#333333",
  },
  applicantCount: {
    backgroundColor: "#2F80ED",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  applicantText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
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
  deleteButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#0C3178",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TaskItem;
