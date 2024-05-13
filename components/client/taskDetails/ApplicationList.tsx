import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import Button from "../../ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const ApplicationList = ({
  applications,
  isModalVisible,
  toggleModal,
  handleApplicationRespond,
  navigation,
}) => {
  const [showRejected, setShowRejected] = useState(false);

  !showRejected &&
    (applications = applications.filter((app) => app.status !== "Rejected"));

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      // transparent={true}
      isVisible={isModalVisible}
      // onRequestClose={toggleModal}
    >
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Applications</Text>
          <Pressable onPress={toggleModal}>
            <Text style={styles.modalClose}>✕</Text>
          </Pressable>
        </View>
        <View style={styles.rejectedSwitch}>
          <Switch
            trackColor={{ false: "#767577", true: "#9dacc9" }}
            thumbColor={showRejected ? "#546ea0" : "#c4c3c4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setShowRejected((prev) => !prev)}
            value={showRejected}
          />
          <Text style={styles.switchText}>Show Rejected Applications?</Text>
        </View>
        <ScrollView contentContainerStyle={styles.applicationsList}>
          {applications.map((application, index) => (
            <View
              key={index}
              style={[
                styles.applicationItem,
                application.status === "Rejected" && {
                  opacity: 0.7,
                  backgroundColor: "#A00C0C30",
                },
              ]}
            >
              <Pressable
                onPress={() => {
                  toggleModal();
                  navigation.push("ProfileDetails", {
                    userId: application.applicant.id,
                  });
                }}
                style={styles.profile}
              >
                <Image
                  source={{
                    uri: application.applicant.avatar,
                  }}
                  style={styles.profilePhoto}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.profileName}>
                    {application.applicant.fullName}
                  </Text>
                  {application.applicant.profile && (
                    <Text style={styles.userTitle}>
                      {application.applicant.profile.jobTitle}
                    </Text>
                  )}
                  <Text style={styles.userCity}>
                    {application.applicant.city}
                  </Text>
                </View>
              </Pressable>
              <View style={styles.actions}>
                {application.status === "Rejected" ? (
                  <View style={styles.checkCircle}>
                    <AntDesign name="close" size={28} color="#A00C0C" />
                  </View>
                ) : (
                  <>
                    <Button
                      size="sm"
                      style="fill"
                      label="Accept"
                      color="#31780c"
                      callback={() => {
                        toggleModal();
                        handleApplicationRespond(application.id, "Accepted");
                      }}
                    />
                    <Button
                      size="sm"
                      style="bare"
                      label="Reject"
                      color="#4e4e4e"
                      callback={() => {
                        handleApplicationRespond(application.id, "Rejected");
                      }}
                    />
                  </>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ApplicationList;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingBottom: 10,
    maxHeight: "90%",
  },
  modalHeader: {
    padding: 16,
    backgroundColor: "#e6eaf1",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "500",
    verticalAlign: "middle",
    textAlign: "left",
  },
  modalClose: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 4,
    color: "#6e6e6e",
  },
  rejectedSwitch: {
    flexDirection: "row",
    paddingHorizontal: 22,
    alignItems: "center",
  },
  switchText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6e6e6e",
  },
  applicationsList: {
    paddingHorizontal: 16,
    gap: 4,
  },
  applicationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#c5c5c5",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    gap: 10,
  },
  profile: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    flex: 1,
    padding: 5,
    paddingBottom: 12,
  },
  profilePhoto: {
    backgroundColor: "#669",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#F58D6180",
  },
  userInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4e4e4e",
  },
  userTitle: {
    fontSize: 14,
    // fontWeight: "40",
    color: "#4e4e4e",
  },
  userCity: {
    flex: 1,
    fontSize: 14,
    // fontWeight: "40",
    color: "#F58D61",
  },
  actions: {
    padding: 5,
    gap: 5,
  },
  checkCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 22,
    borderWidth: 2,
    borderColor: "#A00C0C",
    backgroundColor: "#A00C0C10",
  },
});
