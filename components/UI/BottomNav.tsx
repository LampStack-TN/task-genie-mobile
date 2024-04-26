import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomNav: React.FC = () => {
  const navigation = useNavigation();
  const navItems = [
    { id: 1, screen: "Home", icon: "home" },
    { id: 2, screen: "Step1", icon: "circle-with-plus" },
    { id: 3, screen: "ProfileIndex", icon: "user" },
  ];
  return (
    <View style={styles.navContainer}>
      {navItems.map(({ id, screen, icon }: any) => (
        <View key={id} style={styles.navItem}>
          <Pressable
            onPress={() => navigation.navigate(screen)}
            style={styles.navIcon}
          >
            {({ pressed }) => (
              <Entypo
                name={icon}
                size={32}
                color={pressed ? "#0C3178" : "#5275B7"}
              />
            )}
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default BottomNav;

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
