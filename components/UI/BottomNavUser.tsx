import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SlideUp from "./SlideUp";

const BottomNavUser: React.FC = () => {
  const navigation = useNavigation();
  const [slideOn, setSlideOn] = useState(false);

  const toggleSlide = () => setSlideOn(!slideOn);

  const navItems = [
    { id: 1, screen: "Home", icon: "home", size: 32 },
    { id: 2, screen: "AddTask", icon: "circle-with-plus", size: 45 },
    // { id: 3, screen: "ProfileIndex", icon: "user" },
  ];
  return (
    <View style={styles.navContainer}>
      {navItems.map(({ id, screen, icon, size }: any) => (
        <View key={id} style={styles.navItem}>
          <Pressable
            onPress={() => navigation.navigate(screen)}
            style={styles.navIcon}
          >
            {({ pressed }) => (
              <Entypo
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
            <Entypo
              name="menu"
              size={32}
              color={pressed ? "#0C3178" : "#5275B7"}
            />
          )}
        </Pressable>
        <SlideUp {...{ slideOn, toggleSlide, navigation }} />
      </View>
    </View>
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
