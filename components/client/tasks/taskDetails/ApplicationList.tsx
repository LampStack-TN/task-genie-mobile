import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import Button from "../../../ui/Button";

const ApplicationList = ({
  applications,
  isModalVisible,
  toggleModal,
  handleAcceptApplication,
  handleRejectApplication,
}) => {
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
        <ScrollView style={styles.applicationsList}>
          {[
            ...applications,
            ...applications,
            ...applications,
            ...applications,
            ...applications,
            ...applications,
            ...applications,
            ...applications,
            ...applications,
            ...applications,
            ...applications,
          ].map((application, index) => (
            <View key={index} style={styles.applicationItem}>
              <View style={[styles.profile]}>
                <Image
                  source={{
                    uri: application.applicant.avatar,
                  }}
                  style={styles.profilePhoto}
                />
                <View>
                  <Text style={styles.profileName}>
                    {application.applicant.fullName}
                  </Text>
                  <Text style={styles.userTitle}>
                    {application.applicant.city}
                  </Text>
                </View>
              </View>
              <Button
                size="sm"
                style="fill"
                label="Accept"
                color="#0C3178"
                callback={() => handleAcceptApplication(application.id)}
              ></Button>
              <Button
                size="sm"
                style="bare"
                label="Reject"
                color="#4e4e4e"
                callback={() => handleRejectApplication(application.id)}
              ></Button>
              {/* <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAcceptApplication(application.id)}
            >
              <Text style={styles.acceptButton}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => handleRejectApplication(application.id)}
            >
              <Text style={styles.rejectButton}>✕</Text>
            </TouchableOpacity> */}
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
    maxHeight: "90%",
  },
  modalHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 16,
    textAlign: "left",
  },
  modalClose: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 4,
    color: "#6e6e6e",
  },
  applicationsList: {
    padding: 16,
    marginBottom: 16,
  },
  applicationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#c5c5c5",
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
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#F58D6180",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4e4e4e",
  },
  userTitle: {
    fontSize: 14,
    // fontWeight: "40",
    color: "#4e4e4e",
  },
});
