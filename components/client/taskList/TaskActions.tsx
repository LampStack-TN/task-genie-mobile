import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const TaskActions = ({ task, navigate }) => {
  return (
    <>
      <View style={styles.applicantCount}>
        <Text style={styles.applicantText}>
          {task._count
            ? task._count.applications + " People Applied"
            : "No one Applied Yet"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => 1}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Text
            onPress={() => {
              navigate("MyTabs", { id: task.id });
            }}
            style={styles.buttonText}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TaskActions;

const styles = StyleSheet.create({
  deleteText: {
    fontWeight: "bold",
    color: "#4e4e4e",
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
  buttonText: {
    color: "#0C3178",
    fontSize: 14,
    fontWeight: "bold",
  },
  applicantCount: {
    alignSelf: "flex-end",
    backgroundColor: "#1D4FAF",
    borderColor: "#052157",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  applicantText: {
    fontSize: 14,
    color: "#F2AE91",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
