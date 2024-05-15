import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import Application from "../../types/Application";
import { MaterialIcons } from "@expo/vector-icons";
import { ApiClient } from "../../utils/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import TaskCard from "../../components/professional/TaskCard";
const AppliedTasks = (navigation) => {
  const [applications, setApplication] = useState<Application[]>([]);

  useEffect(() => {
    fetchAppliedTasks();
  }, []);

  const fetchAppliedTasks = async () => {
    try {
      const response = await ApiClient().get("/task-application");
      setApplication(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
    
      {applications.map((application) => (
        <View key={application.id} >
       
          {/* <Pressable
            onPress={() =>
              navigation.navigate("ProDetails", { taskId: application.task.id })
            }
          > */}
          <TaskCard
            task={application.task}
            {...{ onApply: null, onCancel: null, onToggleLike: null }}
          />
          {/* </Pressable> */}
        

        </View>
      ))}
     
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    overflow: "hidden",
    rowGap: 11,
    backgroundColor: "#fff",
  },
});

export default AppliedTasks;
