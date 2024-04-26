import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

type RootStackParamList = {
  TaskList: String;
  AppliedJobs: String;
  Tasks: String;
  MyTasks:String
};

const Menu = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MyTasks")}
      >
        <Entypo name="list" size={24} color="#4e4e4e" />
        <Text style={styles.buttonText}>Task List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AppliedJobs")}
      >
        <MaterialIcons name="check-circle" size={24} color="#4e4e4e" />
        <Text style={styles.buttonText}>Applied Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tasks")}
      >
        <MaterialIcons name="task" size={24} color="#4e4e4e" />
        <Text style={styles.buttonText}>Nearby Jobs</Text>
      </TouchableOpacity>
      <Pressable
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#4e4e4e",
          padding: 10,
          borderRadius: 22,
        }}
        onPress={() => {
          AsyncStorage.removeItem("token");
          dispatch(setUser(null));
        }}
      >
        <MaterialIcons name="logout" size={22} color="white" />
      </Pressable>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderBlockColor: "#c5c5c5",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
    elevation: 3,
    borderBottomWidth: 1,
    borderBlockColor: "#c5c5c5",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e2e2e",
  },
});
