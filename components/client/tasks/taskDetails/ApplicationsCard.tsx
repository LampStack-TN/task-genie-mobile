import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ApplicationsCard = ({ task, toggleModal, navigation }) => {
  if (task.acceptedApplication) {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("ProfileDetails", {
            userId: task.acceptedApplication.applicant.id,
          })
        }
      >
        <View style={styles.acceptedApplicationCard}>
          <Image
            source={{ uri: task.acceptedApplication.applicant.avatar }}
            style={styles.applicantAvatar}
          />
          <View style={styles.acceptedInfo}>
            <Text style={styles.applicantName}>
              {task.acceptedApplication.applicant.fullName}
            </Text>
            <Text style={styles.applicantPrice}>
              {task.acceptedApplication.price} TND
            </Text>
          </View>
          <FontAwesome name="check-circle" size={24} color="green" />
        </View>
      </Pressable>
    );
  }
  return (
    <Pressable onPress={toggleModal}>
      {({ pressed }) => (
        <View
          style={[
            styles.applicantCountButton,
            pressed && { backgroundColor: "#1D4FAFE0" },
          ]}
        >
          <Text style={styles.applicantCountText}>
            {task._count && task._count.applications > 0
              ? `${task._count.applications} People Apllications Pending...`
              : "No one Applied Yet"}
          </Text>
          <Text style={styles.seeDetailsText}>See details →</Text>
        </View>
      )}
    </Pressable>
  );
};

export default ApplicationsCard;

const styles = StyleSheet.create({
  applicantCountButton: {
    backgroundColor: "#1D4FAF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#052157",
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 20,
    position: "relative",
  },

  applicantCountText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  seeDetailsText: {
    color: "#F49871",
    fontWeight: "400",
    fontSize: 14,
    textAlign: "right",
    marginTop: 5,
  },
  applicantName: {
    flex: 1,
    marginHorizontal: 8,
    fontWeight: "500",
    fontSize: 16,
  },
  acceptedApplicationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
  },
  applicantAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  acceptedInfo: {
    flex: 1,
    marginLeft: 10,
  },
  applicantPrice: {
    fontSize: 14,
    color: "#666",
  },
});
