import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";

import Task from "../../../../types/TaskInterface";
import { ApiClient } from "../../../../utils/api";
import { FontAwesome } from "@expo/vector-icons";
import Application from "../../../../types/Application";

import gradient from "../../../../assets/images/double-gradient.png";
import ApplicationList from "./ApplicationList";
import Deletion from "./Deletion";
import Details from "./Details";
import ApplicationsCard from "./ApplicationsCard";

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

  const fatchTask = async () => {
    try {
      const {
        data,
        data: { applications },
      } = await ApiClient().get(`/task/client/${taskId}`);
      setTask(data);
      setApplications(applications);
    } catch (err) {
      console.log("fetchOne fails:", err);
    }
  };

  useEffect(() => {
    fatchTask();
  }, []);

  const handleDelete = async () => {
    try {
      await api.del(`/task/delete/${taskId}`);
      navigation.navigate("Home");
    } catch (err) {
      console.log("Handle delete failed:", err.message);
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
          onPress={() =>
            navigation.navigate("ProfileDetails", {
              userId: application.applicant.id,
            })
          }
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
      <Details {...{ setModalVisible, task, navigation }}>
        <ApplicationsCard {...{ task, toggleModal }} />
      </Details>
      <ApplicationList
        {...{
          applications,
          isModalVisible,
          toggleModal,
          handleAcceptApplication,
          handleRejectApplication,
        }}
      />

      <Deletion {...{ modalVisible, setModalVisible, handleDelete }} />
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
  applicantName: {
    flex: 1,
    marginHorizontal: 8,
    fontWeight: "500",
    fontSize: 16,
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
