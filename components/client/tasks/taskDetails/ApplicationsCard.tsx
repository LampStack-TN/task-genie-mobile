import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Confirmation from "../../../ui/Confirmation";
import { useState } from "react";

const ApplicationsCard = ({
  task,
  toggleModal,
  navigation,
  handleApplicationRespond,
}) => {
  if (task.acceptedApplication) {
    const [completion, setCompletion] = useState(false);

    return (
      <>
        <View>
          <View style={styles.acceptedApplicationCard}>
            <Pressable
              onPress={() =>
                navigation.navigate("ProfileDetails", {
                  userId: task.acceptedApplication.applicant.id,
                })
              }
              style={styles.profile}
            >
              <Image
                source={{ uri: task.acceptedApplication.applicant.avatar }}
                style={styles.profilePhoto}
              />
              <View style={styles.profileData}>
                <Text style={styles.profileName}>
                  {task.acceptedApplication.applicant.fullName}
                </Text>
                <Text style={styles.userTitle}>
                  {task.acceptedApplication.applicant.profile?.jobTitle}
                </Text>
                {task.acceptedApplication.price && (
                  <Text style={styles.userPrice}>
                    {task.acceptedApplication.price}
                    <Text style={{ color: "#6e6e6e", fontSize: 12 }}> TND</Text>
                  </Text>
                )}
              </View>
            </Pressable>
            {task.acceptedApplication.status === "Complete" ? (
              <View style={styles.checkCircle}>
                <AntDesign name="check" size={28} color="green" />
              </View>
            ) : (
              <Pressable onPress={() => setCompletion(true)}>
                <View
                  style={[styles.checkCircle, { backgroundColor: "#0C7831" }]}
                >
                  <AntDesign name="check" size={28} color="white" />
                </View>
              </Pressable>
            )}
          </View>
        </View>

        <Confirmation
          message="Mark This Task As Complete?"
          {...{
            modalVisible: completion,
            setModalVisible: setCompletion,
            onConfirm: () =>
              handleApplicationRespond(task.acceptedApplication.id, "Complete"),
          }}
        />
      </>
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0C7831",
    marginVertical: 5,
  },
  profile: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    flex: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  profilePhoto: {
    backgroundColor: "#669",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#0C7831",
  },
  profileData: {
    alignSelf: "flex-start",
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4e4e4e",
  },
  userTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#F58D61",
  },
  userPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4e4e4e",
  },
  checkCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: 22,
    borderWidth: 2,
    borderColor: "#0C7831",
    backgroundColor: "#0C783110",
  },
});
