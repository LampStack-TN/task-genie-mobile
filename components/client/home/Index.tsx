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

  const menu = [{ id: 1, title: "Task List", name: "MyTasks", icon: "list" }];

  return (
    <ImageBackground
      imageStyle={{ opacity: 0.5 }}
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
                  backgroundColor: "#F58D6120",
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

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: 4,
    gap: 2,
    backgroundColor: "#fff",
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
    borderBlockColor: "#d0d0d0",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "600",
    color: "#2e2e2e",
  },
});
