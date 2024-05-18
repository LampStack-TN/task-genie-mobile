import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../ui/Button";

const colors = {
  Pending: "#0C3178",
  Accepted: "#0c6778",
  Rejected: "#780c0c",
  Complete: "#31780c",
};

const TaskCard = ({ task, children, navigate }) => {
  return (
    <Pressable onPress={() => navigate("TaskDetails", { taskId: task.id })}>
      {({ pressed }) => (
        <View style={[styles.card, pressed && { backgroundColor: "#eff9fe" }]}>
          <View style={styles.header}>
            {task.client && (
              <Image
                style={styles.avatar}
                source={{ uri: task.client?.avatar }}
              />
            )}
            <Text style={styles.title}>{task.title}</Text>
          </View>
          <View style={styles.subHeader}>
            <View style={styles.properties}>
              <View style={styles.property}>
                <MaterialIcons name="place" size={22} color="#1a1561" />
                <Text style={styles.propertyText}>{task.location}</Text>
              </View>
              <View style={styles.property}>
                <MaterialIcons name="timelapse" size={22} color="#611a15" />
                <Text style={styles.propertyText}>Urgency: {task.urgency}</Text>
              </View>
              <View style={styles.property}>
                <MaterialIcons name="access-time" size={22} color="#1e4620" />
                <Text style={styles.propertyText}>{task.dueDate}</Text>
              </View>
            </View>
            <View style={styles.footer}>{children}</View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    elevation: 3,
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
    gap: 4,
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
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 4,
  },
});

export default TaskCard;
