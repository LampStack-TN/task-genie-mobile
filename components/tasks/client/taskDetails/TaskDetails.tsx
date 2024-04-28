import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Task from "../../../../types/TaskInterface";
import { ApiClient } from "../../../../utils/api";
import { FontAwesome6, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Application from "../../../../types/Application";
const TaskDetails: React.FC = ({ route, navigation }: any) => {
  const api = ApiClient();
  const [task, setTask] = useState<Task>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const taskId = route.params.taskId;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const fetchOne = async () => {
    try {
      const { data } = await ApiClient().get(`/task/getOne/${taskId}`);
      setTask(data);
    } catch (err) {
      console.log("fetchOne fails:", err);
    }
  };

  useEffect(() => {
    fetchOne();
    fetchApplications();
  }, []);

  const handleDelete = async () => {
    try {
      await api.del(`/task/delete/${taskId}`);
      navigation.navigate("Home");
    } catch (err) {
      console.log("Handle delete failed:", err.message);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data } = await api.get(`task/${taskId}/applications`);
      setApplications(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{
              uri: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
              // uri: task.client?.avatar,
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>{task.title}</Text>
        </View>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.titleText}>Urgency: {task.urgency}</Text>
        <View style={styles.iconTextContainer}>
          <Ionicons
            style={[styles.iconBase]}
            name="bag-handle-sharp"
            size={24}
          />
          <Text style={styles.subHeaderText}>{task.title}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <MaterialIcons style={styles.iconBase} size={24} name="date-range" />
          <Text style={styles.timeText}>
            {task.updatedAt ? formatDate(task.updatedAt) : ""}
          </Text>
        </View>
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.iconTextContainer}>
          <FontAwesome6 style={styles.iconBase} name="location-dot" size={24} />
          <Text style={styles.locationText}>{task.location}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <FontAwesome6
            style={styles.iconBase}
            name="circle-dollar-to-slot"
            size={24}
          />
          <Text style={styles.priceText}>
            {task.minPrice} - {task.maxPrice}
          </Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>
      <View style={styles.skillContainer}>
        {task.skills?.map((skill, index) => (
          <Text key={index} style={styles.skillPill}>
            {skill.name}
          </Text>
        ))}
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            navigation.navigate("MyTabs", { taskId: task.id, task: task });
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
      <TouchableOpacity
        style={styles.applicantCountButton}
        onPress={toggleModal}
      >
        <Text style={styles.applicantCountText}>
          {task._count && task._count.applications > 0
            ? `${task._count.applications} People Applied`
            : "No one Applied Yet"}
        </Text>
        <Text style={styles.seeDetailsText}>See details →</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Applicants</Text>
            <ScrollView style={styles.applicationsList}>
              {applications.map((application, index) => (
                <View key={index} style={styles.applicationItem}>
                  <Image source={{}} style={styles.avatar} />
                  <Text style={styles.applicantName}>
                    {application.applicant.fullName}
                  </Text>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text>✓</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={toggleModal}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              are u sure u want to delete this details
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
                  handleDelete();
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 22,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
  },
  title: {
    paddingHorizontal: 10,
    flex: 1,
  },
  titleText: {
    verticalAlign: "middle",
    fontSize: 28,
    fontWeight: "600",
    color: "#0C3178",
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
  subHeaderText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 10,
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
    paddingLeft: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EB5757",
    paddingRight: 10,
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 250,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
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
    margin: 5,
  },
  iconBase: {
    color: "black",
    marginRight: 5,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  applicantCountButton: {
    backgroundColor: "#2F80ED",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  applicantCountText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },

  seeDetailsText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
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
  acceptButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: "#27ae60",
    borderRadius: 20,
  },
  rejectButton: {
    padding: 10,
    backgroundColor: "#c0392b",
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  applicationsList: {
    marginBottom: 16,
  },
  applicationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  applicantName: {
    flex: 1,
    marginHorizontal: 8,
    fontWeight: "500",
    fontSize: 16,
  },
});

export default TaskDetails;
