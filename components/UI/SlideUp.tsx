import { StyleSheet, Text, View, Modal, Pressable, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const SlideUp = ({ slideOn, toggleSlide, navigation }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={slideOn}
      onRequestClose={toggleSlide}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
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
                      uri: "https://images.assetsdelivery.com/compings_v2/fizkes/fizkes2011/fizkes201102042.jpg",
                    }}
                    style={styles.profilePhoto}
                  />
                  <Text style={styles.profileName}>Linda Mnasri</Text>
                </View>
              )}
            </Pressable>
            <Pressable onPress={toggleSlide}>
              <View style={styles.modalClose}>
                <Entypo name="chevron-down" size={24} color="#4e4e4e" />
              </View>
            </Pressable>
          </View>
          <View style={styles.slideMenu}></View>
        </View>
      </View>
    </Modal>
  );
};

export default SlideUp;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "relative",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  modal: {
    backgroundColor: "white",
    maxHeight: "90%",
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderWidth: 1,
    borderColor: "#c5c5c5",
    padding: 15,
  },
  modalHeader: {
    gap: 5,
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: "#c5c5c5",
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
    color: "#2e2e2e",
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
    height: 500,
  },
});
