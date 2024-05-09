import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";

import Task from "../../../../types/TaskInterface";
import { ApiClient } from "../../../../utils/api";
import Application from "../../../../types/Application";

import gradient from "../../../../assets/images/double-gradient.png";
import ApplicationList from "./ApplicationList";
import Details from "./Details";
import ApplicationsCard from "./ApplicationsCard";
import Confirmation from "../../../ui/Confirmation";

enum Status {
  Pending,
  Accepted,
  Rejected,
  Complete,
}

const TaskDetails: React.FC = ({ route, navigation }: any) => {
  const api = ApiClient();
  const [task, setTask] = useState<Task>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [completion, setCompletion] = useState(false);

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
      // toggleModal();
      setTask((task) => ({ ...task, acceptedApplication: data }));
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
          {...{ task, toggleModal, navigation, setCompletion }}
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

      <Confirmation
        message="Mark This As Complete?"
        // confirmColor="#a02020"
        {...{
          modalVisible: completion,
          setModalVisible: setCompletion,
          onConfirm: null,
        }}
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
