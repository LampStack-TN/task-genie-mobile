import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SlideUp from "./SlideUp";

const BottomNavUser: React.FC = () => {
  const navigation = useNavigation();
  const [slideOn, setSlideOn] = useState(false);

  const toggleSlide = () => setSlideOn(!slideOn);

  const navItems = [
    { id: 1, screen: "MyTasks", icon: "task-alt", size: 32 },
    { id: 2, screen: "AddTask", icon: "add-circle", size: 45 },
    // { id: 3, screen: "ProfileIndex", icon: "user" },
  ];
  return (
    <>
      <View style={styles.navContainer}>
        {navItems.map(({ id, screen, icon, size }: any) => (
          <View key={id} style={styles.navItem}>
            <Pressable
              onPress={() => navigation.navigate(screen as never)}
              style={styles.navIcon}
            >
              {({ pressed }) => (
                <MaterialIcons
                  name={icon}
                  size={size}
                  color={pressed ? "#0C3178" : "#5275B7"}
                />
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
                color={pressed ? "#0C3178" : "#5275B7"}
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
    borderColor: "#c5c5c5",
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
    flex: 1,
    height: "100%",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
