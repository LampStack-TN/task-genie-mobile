import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../redux/slices/userSlice";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import ProMenu from "../client/Menu";
import Modal from "react-native-modal";

const SlideUp = ({ slideOn, toggleSlide, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  return (
    <Modal
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      animationInTiming={400}
      animationOutTiming={400}
      isVisible={slideOn}
      onSwipeStart={console.log}
      style={styles.modalOverlay}
    >
      <Pressable
        style={styles.modal}
        onPress={(event) => event.stopPropagation()}
      >
        <View style={styles.modalHeader}>
          <Pressable
            onPress={() => {
              navigation.navigate("ProfileIndex");
              toggleSlide();
            }}
            style={{ flex: 1 }}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.profile,
                  pressed && { backgroundColor: "#f0f0f0" },
                ]}
              >
                <Image
                  source={{
                    uri: user.avatar,
                  }}
                  style={styles.profilePhoto}
                />
                <Text style={styles.profileName}>{user.fullName}</Text>
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleSlide}>
            <View style={styles.modalClose}>
              <Entypo name="chevron-down" size={24} color="#4e4e4e" />
            </View>
          </Pressable>
        </View>
        <View style={styles.slideMenu}>
          <ProMenu />
        </View>
        <View
          style={{
            alignItems: "flex-start",
            paddingHorizontal: 22,
            paddingVertical: 8,
            backgroundColor:"#fdeee8a0"
          }}
        >
          <Pressable
            style={{
              // flexDirection: "row",
              // position: "absolute",
              // bottom: 20,
              // left: 20,
              backgroundColor: "#051532",
              padding: 10,
              gap: 5,
              borderRadius: 22,
            }}
            onPress={() => {
              AsyncStorage.removeItem("token");
              dispatch(setUser(null));
            }}
          >
            <MaterialIcons name="logout" size={22} color="white" />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SlideUp;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
  },
  modal: {
    backgroundColor: "white",
    // maxHeight: "90%",
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    // borderWidth: 1,
    borderColor: "#c5c5c5",
  },
  modalHeader: {
    gap: 5,
    flexDirection: "row",
    height: 85,
    alignItems: "center",
    backgroundColor: "#082254",
    paddingHorizontal: 18,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderColor: "#c5c5c5",
    paddingVertical: 15,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  profile: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    gap: 12,
    padding: 5,
    borderRadius: 5,
  },
  profilePhoto: {
    backgroundColor: "#669",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#F58D6180",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "500",
    color: "#fff",
  },
  modalClose: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  slideMenu: {
    // height: 500,
    flex: 1,
  },
});
