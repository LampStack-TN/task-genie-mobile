import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../redux/slices/userSlice";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import ProMenu from "../professional/home/ProIndex";
import Menu from "../professional/Menu";

const SideMenu = ({ slideOn, toggleSlide, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  return (
    <Modal
      animationIn="slideInRight"
      animationOut="slideOutRight"
      // transparent={true}
      isVisible={slideOn}
      style={styles.modalOverlay}
      // onRequestClose={toggleSlide}
    >
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
                    uri: user.avatar,
                  }}
                  style={styles.profilePhoto}
                />
                <Text style={styles.profileName}>{user.fullName}</Text>
              </View>
            )}
          </Pressable>
        </View>
        <View style={styles.slideMenu}>
          <Menu {...{ toggleSlide }} />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 22,
            flexDirection: "row",
            paddingVertical: 8,
          }}
        >
          <Pressable
            style={{
              // flexDirection: "row",
              // position: "absolute",
              // bottom: 20,
              // left: 20,
              backgroundColor: "#0C3178",
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
          <Pressable
            style={{
              // flexDirection: "row",
              // position: "absolute",
              // bottom: 20,
              // left: 20,
              backgroundColor: "#30",
              padding: 10,
              borderRadius: 30,
            }}
            onPress={toggleSlide}
          >
            <MaterialIcons name="menu" size={32} color="#0C3178" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  modalOverlay: {
    alignItems: "flex-end",
    margin: 0,
    // backgroundColor: "#ff00ff50",
    width: "100%",
    height: "100%",
  },
  modal: {
    backgroundColor: "white",
    width: "89%",
    height: "100%",
  },
  modalHeader: {
    gap: 5,
    flexDirection: "row",
    height: 150,
    alignItems: "flex-end",
    backgroundColor: "#071d48",
    paddingHorizontal: 18,
    overflow: "hidden",
    // borderBottomWidth: 1,
    // borderColor: "#c5c5c5",
    paddingVertical: 15,
  },
  profile: {
    alignItems: "center",
    flexDirection: "row",
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
    borderColor: "#f58d61",
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
    height: 500,
    flex: 1,
  },
});
