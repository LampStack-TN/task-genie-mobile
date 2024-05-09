import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  TaskList: String;
  AppliedJobs: String;
  Tasks: String;
  MyTasks: String;
};

const Menu = ({ toggleSlide }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const menu = [
    { id: 3, title: "Tasks", name: "task-list", icon: "search" },
    {
      id: 2,
      title: "My Services",
      name: "MyServices",
      icon: "auto-awesome",
    },
    {
      id: 4,
      title: "Applications",
      name: "AppliedJobs",
      icon: "task-alt",
    },
    {
      id: 5,
      title: "Favourite Tasks",
      name: "FavouriteTasksList",
      icon: "list",
    },
    { id: 6, title: "Chat", name: "ConversationList", icon: "wechat" },
  ];

  return (
    <View style={styles.container}>
      {menu.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => {
            navigation.navigate(item.name);
            toggleSlide();
          }}
        >
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
              {item.id === 5 ? (
                <AntDesign name="heart" size={22} color="#93543a" />
              ) : (
                <MaterialIcons name={item.icon} size={22} color="#93543a" />
              )}
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
    // backgroundColor: "#fef3ef",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 16,
    paddingHorizontal: 22,
    gap: 8,
    borderBottomWidth: 1,
    borderColor: "#fde8df",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    color: "#4e4e4e",
  },
});
