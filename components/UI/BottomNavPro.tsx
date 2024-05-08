import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useState } from "react";
import useKeyboardOpen from "../../utils/useKeyboardOpen";
import { useSelector } from "react-redux";
import SideMenu from "./SideMenu";

const BottomNavPro: React.FC = () => {
  const user = useSelector((state: any) => state.user);

  const navigation = useNavigation();
  const [slideOn, setSlideOn] = useState(false);

  const isKeyboardOpen = useKeyboardOpen();

  const toggleSlide = () => setSlideOn(!slideOn);

  const navItems = [
    { id: 1, screen: "task-list", icon: "task", size: 32 },
    { id: 2, screen: "AddService", icon: "add-circle-outline", size: 45 },
    // { id: 3, screen: "ProfileIndex", icon: "user" },
  ];
  return (
    !isKeyboardOpen && (
      <>
        <View style={styles.navContainer}>
          {navItems.map(({ id, screen, icon, size }: any) => (
            <View key={id} style={styles.navItem}>
              <Pressable
                onPress={() => navigation.navigate(screen)}
                style={styles.navIcon}
              >
                {({ pressed }) => (
                  <MaterialIcons
                    name={icon}
                    size={size}
                    color={pressed ? "#fff" : "#fff"}
                  />
                )}
              </Pressable>
            </View>
          ))}
          <View style={styles.navItem}>
            <Pressable onPress={toggleSlide} style={styles.navIcon}>
              <Image
                source={{ uri: user.avatar }}
                style={{
                  backgroundColor: "#669",
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: "#F58D6180",
                }}
              />
            </Pressable>
          <SideMenu {...{ slideOn, toggleSlide, navigation }} />
          </View>
        </View>
      </>
    )
  );
};

export default BottomNavPro;

const styles = StyleSheet.create({
  navContainer: {
    borderTopWidth: 1,
    borderColor: "#c5c5c5",
    height: 60,
    backgroundColor: "#0C3178",
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
