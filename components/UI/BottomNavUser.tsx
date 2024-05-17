import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SlideUp from "./SlideUp";
import { navigationRef } from "../../navigations/RootNavigation";

const BottomNavUser: React.FC = () => {
  const navigation = useNavigation();
  const [slideOn, setSlideOn] = useState(false);
  const [currentScreen, setScreen] = useState("MyTasks");
  console.log(currentScreen);

  const toggleSlide = () => setSlideOn(!slideOn);

  const navItems = [
    { id: 1, screen: "MyTasks", icon: "task-alt", size: 32 },
    { id: 2, screen: "ConversationList", icon: "wechat", size: 32 },
    { id:3, screen: "AddTask", icon: "add-circle", size: 45 },
    { id: 4, screen: "notifications", icon: "notifications", size: 32 },
    // { id: 3, screen: "ProfileIndex", icon: "user" },
  ];
  return (
    <>
      <View style={styles.navContainer}>
        {navItems.map(({ id, screen, icon, size }: any) => (
          <View key={id} style={styles.navItem}>
            <Pressable
              onPress={() => {
                setScreen(screen);
                navigation.navigate(screen as never);
              }}
              style={styles.navIcon}
            >
              {({ pressed }) => (
                <View
                  style={[
                    styles.navIcon,
                    currentScreen === screen && {
                      // backgroundColor: "#f58d6140",
                      borderBottomWidth: 5,
                      borderColor: "#f58d61",
                    },
                  ]}
                >
                  <MaterialIcons
                    name={icon}
                    size={pressed ? size * 1.1 : size}
                    color={
                      pressed || currentScreen === screen
                        ? "#0C3178"
                        : "#051532"
                    }
                  />
                </View>
              )}
            </Pressable>
          </View>
        ))}
        <View style={styles.navItem}>
          <Pressable onPress={toggleSlide} style={styles.navIcon}>
            {({ pressed }) => (
              <MaterialIcons
                name="menu"
                size={32}
                color={pressed ? "#0C3178" : "#051532"}
              />
            )}
          </Pressable>
          <SlideUp {...{ slideOn, toggleSlide, navigation }} />
        </View>
      </View>
      {slideOn && (
        <View
          style={{
            backgroundColor: "#2e2e2ea0",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        ></View>
      )}
    </>
  );
};

export default BottomNavUser;

const styles = StyleSheet.create({
  navContainer: {
    borderTopWidth: 1,
    borderColor: "#fac1a9",
    height: 60,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navIcon: {
    height: 50,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
