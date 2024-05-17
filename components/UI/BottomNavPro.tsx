import { Image, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useState } from "react";
import useKeyboardOpen from "../../utils/useKeyboardOpen";
import { useSelector } from "react-redux";
import SideMenu from "./SideMenu";
import { navigationRef } from "../../navigations/RootNavigation";

const BottomNavPro: React.FC = () => {
  const user = useSelector((state: any) => state.user);

  const [slideOn, setSlideOn] = useState(false);
  const [currenScreen, setScreen] = useState("task-list");

  const isKeyboardOpen = useKeyboardOpen();

  const toggleSlide = () => setSlideOn(!slideOn);

  const navItems = [
    { id: 1, screen: "task-list", icon: "task", size: 32 },
    { id: 2, screen: "ConvesationList", icon: "wechat", size: 32 },
    { id: 3, screen: "AddService", icon: "add-circle-outline", size: 45 },
    { id: 4, screen: "_", icon: "notifications", size: 32 },
    // { id: 3, screen: "ProfileIndex", icon: "user" },
  ];
  return (
    !isKeyboardOpen && (
      <>
        <View style={styles.navContainer}>
          {navItems.map(({ id, screen, icon, size }: any) => (
            <View key={id} style={styles.navItem}>
              <Pressable
                onPress={() => {
                  setScreen(screen);
                  navigationRef.navigate(screen as never);
                }}
              >
                {({ pressed }) => (
                  <View
                    style={[
                      styles.navIcon,
                      currenScreen === screen && {
                        backgroundColor: "#61c9f530",
                      },
                    ]}
                  >
                    <MaterialIcons
                      name={icon}
                      size={pressed ? size * 1.1 : size}
                      color={
                        pressed || currenScreen === screen ? "#61c9f5" : "#fff"
                      }
                    />
                  </View>
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
            <SideMenu
              {...{ slideOn, toggleSlide, navigation: navigationRef }}
            />
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
    borderColor: "#092760",
    height: 60,
    backgroundColor: "#071d48",
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
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
