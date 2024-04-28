import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

type RootStackParamList = {
  TaskList: String;
  AppliedJobs: String;
  Tasks: String;
  MyTasks: String;
};

const Menu = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const menu = [
    { id: 1, title: "Task List", name: "MyTasks", icon: "list" },
    {
      id: 2,
      title: "Applied Tasks",
      name: "AppliedJobs",
      icon: "check-circle",
    },
    { id: 3, title: "Nearby Jobs", name: "Tasks", icon: "task" },
  ];

  return (
    <View style={styles.container}>
      {menu.map((item) => (
        <Pressable key={item.id} onPress={() => navigation.navigate(item.name)}>
          {({ pressed }) => (
            <View
              style={[
                styles.button,
                pressed && { backgroundColor: "#F58D6120" },
              ]}
            >
              <MaterialIcons name={item.icon} size={24} color="#0C3178" />
              <Text style={styles.buttonText}>{item.title}</Text>
            </View>
          )}
        </Pressable>
      ))}

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
    alignItems: "stretch",
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
    paddingVertical: 26,
    paddingHorizontal: 20,
    elevation: 1,
    borderBottomWidth: 1,
    borderBlockColor: "#c5c5c5",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: "600",
    color: "#2e2e2e",
  },
});
