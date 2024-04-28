import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const UserTaskCard: React.FC<{
  task;
  handleDelete: (taskId: number) => void;
  navigation: any;
}> = ({ task, handleDelete, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Pressable
      onPress={() => navigation.navigate("TaskDetails", { taskId: task.id })}
    >
      {({ pressed }) => (
        <View
          style={[styles.card, pressed ? { backgroundColor: "#f8f8f8" } : {}]}
        >
          <Text style={styles.title}>{task.title}</Text>

          <View style={styles.infoSection}>
            <View style={styles.info}>
              <Icon name="event" size={20} color="#FF9800" />
              <Text style={styles.infoText}>{task.dueDate}</Text>
            </View>
            <View style={styles.info}>
              <Icon name="place" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>{task.location}</Text>
            </View>
            <View style={styles.info}>
              <Icon name="attach-money" size={20} color="#F44336" />
              <Text
                style={styles.infoText}
              >{`${task.minPrice} - ${task.maxPrice}`}</Text>
            </View>
          </View>
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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text
                onPress={() => {
                  navigation.navigate("MyTabs", { id: task.id });
                }}
                style={styles.buttonText}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Are you sure you want to delete this task?
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonConfirm]}
                    onPress={() => {
                      handleDelete(task.id);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#bfbfbf",
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 20,
    color: "#0C3178",
    fontWeight: "600",
    marginBottom: 5,
  },
  infoSection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    flexBasis: "50%",
  },
  infoText: {
    marginLeft: 5,
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
  buttonText: {
    color: "#333333",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonConfirm: {
    backgroundColor: "#F44336",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default UserTaskCard;
