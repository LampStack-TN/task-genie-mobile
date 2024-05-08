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
import gradient from "../../../assets/images/orange_gradient.png";

type RootStackParamList = {
  TaskList: String;
  AppliedJobs: String;
  Tasks: String;
  MyTasks: String;
};

const Menu = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const menu = [
    { id: 1, title: "My Tasks", name: "MyTasks", icon: "task" },
    { id: 2, title: "Services", name: "ServicesList", icon: "auto-awesome" },
    {
      id: 3,
      title: "My Requests",
      name: "MyHiredServices",
      icon: "pending-actions",
    },
    { id: 4, title: "Chat", name: "ConversationList", icon: "chat" },
  ];

  return (
    <View style={styles.container}>
      {menu.map((item) => (
        <Pressable key={item.id} onPress={() => navigation.navigate(item.name)}>
          {({ pressed }) => (
            <View
              style={[
                styles.button,
                pressed && {
                  backgroundColor: "#F58D6120",
                },
              ]}
            >
              {/* <MaterialIcons name={'circle'} size={14} color="#93543a" /> */}
              <MaterialIcons name={item.icon} size={22} color="#93543a" />
              <Text style={styles.buttonText}>{item.title}</Text>
              <MaterialIcons name={"chevron-right"} size={22} color="#93543a" />
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 16,
    paddingHorizontal: 22,
    gap: 8,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "500",
    flex: 1,
    color: "#4e4e4e",
  },
});
