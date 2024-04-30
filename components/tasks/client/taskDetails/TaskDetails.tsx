import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import Task from "../../../../types/TaskInterface";
import { ApiClient } from "../../../../utils/api";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Application from "../../../../types/Application";

import gradient from "../../../../assets/images/double-gradient.png";
import Skills from "../../../../data/skills.json";

const TaskDetails: React.FC = ({ route, navigation }: any) => {
  const skill = Skills.slice(0, 5);
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
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  const handleAcceptApplication = async (applicationId: number) => {
    try {
      const response = await api.post("task/application/respond", {
        applicationId,
        action: "accept",
      });
      if (response.data) {
        setApplications((prevApplications) =>
          prevApplications.map((ele) =>
            ele.id === applicationId ? { ...ele, status: "Accepted" } : ele
          )
        );
        setApplications(response.data);

      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectApplication = async (applicationId: number) => {
    try {
      const response = await api.post("task/application/respond", {
        applicationId,
        action: "reject",
      });
      if (response.data) {
        setApplications((prevApplications) =>
          prevApplications.filter((ele) => ele.id !== applicationId)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  const renderAcceptedApplications = () => {
    return applications
      .filter((ele) => ele.status === "Accepted")
      .map((application, index) => (
        <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate('ProfileDetails', { userId: application.applicant.id })} 
      >
        <View key={index} style={styles.acceptedApplicationCard}>
          <Image
            source={{ uri: application.applicant.avatar }}
            style={styles.applicantAvatar}
          />
          <View style={styles.acceptedInfo}>
            <Text style={styles.applicantName}>
              {application.applicant.fullName}
            </Text>
            <Text style={styles.applicantPrice}>{application.price} TND</Text>
          </View>
          <FontAwesome name="check-circle" size={24} color="green" />
        </View>
        </TouchableOpacity>
      ));
  };

  return (
    <ImageBackground
      source={gradient}
      resizeMode="cover"
      imageStyle={{ opacity: 0.5 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
            // uri: task.client?.avatar,
          }}
          style={styles.avatar}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>{task.title}</Text>
        </View>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.property}>
          <MaterialIcons name="location-on" size={28} color="#4e4e4e" />
          <Text style={styles.propertyText}>{task.location}</Text>
        </View>
        <View style={styles.property}>
          <MaterialIcons name="calendar-month" size={28} color="#4e4e4e" />
          <Text style={styles.propertyText}>{task.dueDate}</Text>
        </View>
        <View style={styles.property}>
          <MaterialCommunityIcons name="clock" size={28} color="#4e4e4e" />
          <Text style={styles.propertyText}>Urgency: {task.urgency}</Text>
        </View>
        <View style={styles.property}>
          <View style={styles.roundIcon}>
            <FontAwesome name="dollar" size={18} color="#fff" />
          </View>
          <Text style={styles.propertyText}>
            {task.minPrice} - {task.maxPrice} TND
          </Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>
      <View style={styles.skillContainer}>
        {skill.map((skill, index) => (
          <View key={index} style={styles.skillPill}>
            <Text key={index} style={styles.skillText}>
              {skill.name}
            </Text>
          </View>
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
        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("MyTasks");
          }}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity> */}
      </View>
      {renderAcceptedApplications()}
      <Pressable onPress={toggleModal}>
        {({ pressed }) => (
          <View
            style={[
              styles.applicantCountButton,
              pressed && { backgroundColor: "#1D4FAFE0" },
            ]}
          >
            <Text style={styles.applicantCountText}>
              {task._count && task._count.applications > 0
                ? `${task._count.applications} People Apllications Pending...`
                : "No one Applied Yet"}
            </Text>
            <Text style={styles.seeDetailsText}>See details →</Text>
          </View>
        )}
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Applications</Text>
              <Pressable onPress={toggleModal}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>
            <ScrollView style={styles.applicationsList}>
              {applications
                .filter((ele) => ele.status !== "Accepted")
                .map((application, index) => (
                  <View key={index} style={styles.applicationItem}>
                    <Image source={{}} style={styles.avatar} />
                    <Text style={styles.applicantName}>
                      {application.applicant.fullName}
                    </Text>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => handleAcceptApplication(application.id)}
                    >
                      <Text style={styles.acceptButton}>✓</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleRejectApplication(application.id)}
                    >
                      <Text style={styles.rejectButton}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}></Text>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>
            <View style={{}}>
              <Text style={styles.modalText}>
                Are u sure u want to delete this task?
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
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 22,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
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
    borderWidth: 3,
    borderColor: "#F58D6150",
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
  subHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
    rowGap: 10,
  },
  property: {
    flex: 1,
    flexDirection: "row",
    flexBasis: "50%",
    alignItems: "center",
    columnGap: 4,
  },
  propertyText: {
    flex: 1,
    color: "#2e2e2e",
    fontWeight: "400",
    fontSize: 18,
  },
  description: {
    marginVertical: 10,
    padding: 5,
  },
  descriptionText: {
    fontSize: 22,
    color: "#4e4e4e",
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  skillPill: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#6e6e6e",
    backgroundColor: "#f8f8f8",
    verticalAlign: "middle",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 5,
  },
  skillText: {
    verticalAlign: "middle",
    textAlign: "center",
    color: "#4e4e4e",
    fontSize: 14,
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

  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 20,
  },
  applicantCountButton: {
    backgroundColor: "#1D4FAF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#052157",
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 20,
    position: "relative",
  },

  applicantCountText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  seeDetailsText: {
    color: "#F49871",
    fontWeight: "400",
    fontSize: 14,
    textAlign: "right",
    marginTop: 5,
  },
  centeredView: {
    position: "absolute",
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
    elevation: 5,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
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
    textAlign: "center",
    color: "#4e4e4e",
    fontSize: 18,
    fontWeight: "600",
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
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 12,
  },
  modal: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 16,
    textAlign: "left",
  },
  modalClose: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 4,
    color: "#6e6e6e",
  },
  applicationsList: {
    marginBottom: 16,
  },
  applicationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  applicantName: {
    flex: 1,
    marginHorizontal: 8,
    fontWeight: "500",
    fontSize: 16,
  },
  roundIcon: {
    backgroundColor: "#4e4e4e",
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
  acceptedApplicationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
  },
  applicantAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  acceptedInfo: {
    flex: 1,
    marginLeft: 10,
  },
  applicantPrice: {
    fontSize: 14,
    color: "#666",
  },
});

export default TaskDetails;
