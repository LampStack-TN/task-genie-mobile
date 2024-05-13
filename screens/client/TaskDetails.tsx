import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";

import Task from "../../types/TaskInterface";
import { ApiClient } from "../../utils/api";
import Application from "../../types/Application";

import gradient from "../../assets/images/double-gradient.png";
import ApplicationList from "../../components/client/taskDetails/ApplicationList";
import Details from "../../components/client/taskDetails/Details";
import ApplicationsCard from "../../components/client/taskDetails/ApplicationsCard";
import Confirmation from "../../components/ui/Confirmation";

type Status = "Pending" | "Accepted" | "Rejected" | "Complete";

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
      } = await api.get(`/task/client/${taskId}`);
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

  const handleApplicationRespond = async (
    applicationId: number,
    status: Status
  ) => {
    try {
      const { data } = await api.post("task-application/application/respond", {
        applicationId,
        status,
      });

      // set acceptedApplication on acceptance action

      if (status === "Rejected") {
        // Update applications state if application is rejected
        setTask((prevTask) => ({
          ...prevTask,
          applications: prevTask.applications.map((app) =>
            app.id === applicationId ? { ...app, status: "Rejected" } : app
          ),
        }));
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === applicationId ? { ...app, status: "Rejected" } : app
          )
        );
      } else {
        setTask((task) => ({ ...task, acceptedApplication: data }));
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
        <ApplicationsCard
          {...{ task, toggleModal, navigation, handleApplicationRespond }}
        />
      </Details>
      <ApplicationList
        {...{
          navigation,
          applications,
          isModalVisible,
          toggleModal,
          handleApplicationRespond,
        }}
      />

      <Confirmation
        message="Are you sure?"
        confirmColor="#a02020"
        {...{ modalVisible, setModalVisible, onConfirm: handleDelete }}
      />
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
