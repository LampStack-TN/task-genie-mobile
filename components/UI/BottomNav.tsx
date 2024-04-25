import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const BottomNav = () => {
  // const navItems = [
  //     {id=1}
  // ]
  return (
    <View style={styles.navContainer}>
      <View style={styles.navItem}>
        <Entypo name="home" size={32} color="#0C3178" />
      </View>
      <View style={styles.navItem}>
        <Entypo name="circle-with-plus" size={32} color="#0C3178" />
      </View>
      <View style={styles.navItem}>
        <Entypo name="user" size={32} color="#0C3178" />
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  navContainer: {
    height: 60,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
