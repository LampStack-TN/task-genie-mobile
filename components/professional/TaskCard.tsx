import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../ui/Button";

const colors = {
  Pending: "#0C3178",
  Accepted: "#0c6778",
  Rejected: "#780c0c",
  Complete: "#31780c",
};

const TaskCard = ({ task, onApply, onCancel, onToggleLike }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: task.client?.avatar }} />
        <Text style={styles.title}>{task.title}</Text>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.properties}>
          <View style={styles.property}>
            <MaterialIcons name="place" size={22} color="#4e4e4e" />
            <Text style={styles.propertyText}>{task.location}</Text>
          </View>
          <View style={styles.property}>
            <MaterialIcons name="timelapse" size={22} color="#4e4e4e" />
            <Text style={styles.propertyText}>Urgency: {task.urgency}</Text>
          </View>
          <View style={styles.property}>
            <MaterialIcons name="access-time" size={22} color="#4e4e4e" />
            <Text style={styles.propertyText}>{task.dueDate}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            label={task.applied ? task.applications[0].status + "..." : "Aplly"}
            style={task.applied ? "light" : "fill"}
            size="sm"
            color={task.applied && colors[task.applications[0].status]}
            callback={task.applied ? () => onCancel(task.applications[0].id) : () => onApply(task)}
          />
          <TouchableOpacity onPress={() => onToggleLike()}>
            <MaterialIcons
              name={task.liked ? "favorite" : "favorite-outline"}
              size={40}
              color="#F58D61"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#7a4630",
    marginVertical: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    color: "#0c3178",
    alignSelf: "center",
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
  subHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  properties: {
    flexWrap: "wrap",
    rowGap: 2,
    flex: 1,
  },
  property: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  propertyText: {
    color: "#4e4e4e",
    fontWeight: "400",
    fontSize: 18,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    columnGap: 4,
  },
});

export default TaskCard;
