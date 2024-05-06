import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";

import Task from "../../../../types/TaskInterface";
import { ApiClient } from "../../../../utils/api";
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

  return (
    <ImageBackground
      source={gradient}
      resizeMode="cover"
      imageStyle={{ opacity: 0.5 }}
      style={styles.container}
    >
      <Details {...{ setModalVisible, task, navigation }}>
        <ApplicationsCard {...{ task, toggleModal, navigation }} />
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
    padding: 12,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default TaskDetails;
