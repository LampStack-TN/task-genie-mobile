import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import gradient from "../../../assets/images/double-gradient.png";

type RootStackParamList = {
  TaskList: String;
  AppliedJobs: String;
  Tasks: String;
  MyTasks: String;
};

const ProMenu = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const menu = [
    {
      id: 2,
      title: "My Services",
      name: "MyServices",
      icon: "check-circle",
    },
    { id: 3, title: "Nearby Jobs", name: "task-list", icon: "task" },
    {
      id: 4,
      title: "Applied Tasks",
      name: "AppliedJobs",
      icon: "check-circle",
    },
    {
      id: 5,
      title: "FavouriteTasksList",
      name: "FavouriteTasksList",
      icon: "list",
    },
    { id: 6, title: "Chat", name: "ConversationList", icon: "chat" },
  ];

  return (
    <ImageBackground
      imageStyle={{ opacity: 1, transform: [{ scaleY: -1 }] }}
      source={gradient}
      style={styles.container}
    >
      {menu.map((item) => (
        <Pressable key={item.id} onPress={() => navigation.navigate(item.name)}>
          {({ pressed }) => (
            <View
              style={[
                styles.button,
                pressed && {
                  backgroundColor: "#60606010",
                },
              ]}
            >
              <MaterialIcons name={item.icon} size={32} color="#0C3178e0" />
              <Text style={styles.buttonText}>{item.title}</Text>
            </View>
          )}
        </Pressable>
      ))}
    </ImageBackground>
  );
};

export default ProMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "stretch",
    justifyContent: "flex-start",
    borderBlockColor: "#c5c5c5",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffa0",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBlockColor: "#d0d0d0",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "600",
    color: "#2e2e2e",
  },
});
